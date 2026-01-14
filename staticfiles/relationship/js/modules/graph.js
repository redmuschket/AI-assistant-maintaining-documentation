import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export class NetworkGraph {
    constructor(containerSelector) {
        this.container = d3.select(containerSelector);
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
    }

    // Метод инициализации
    render(data) {
        this.nodes = data.nodes;
        this.links = data.links;

        // Очищаем контейнер перед отрисовкой
        this.container.selectAll("*").remove();

        // 1. Создаем SVG
        const svg = this.container.append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", [0, 0, this.width, this.height]);

        const g = svg.append("g");

        // 2. Настраиваем симуляцию
        this.simulation = d3.forceSimulation(this.nodes)
            .force("link", d3.forceLink(this.links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(this.width / 2, this.height / 2))
            .force("collide", d3.forceCollide().radius(d => d.type === 'file' ? 50 : 20).iterations(2));

        // 3. Рисуем элементы
        const link = g.append("g")
            .attr("stroke", "#999")
            .attr("stroke-opacity", 0.6)
            .selectAll("line")
            .data(this.links)
            .join("line")
            .attr("stroke-width", 1.5);

        const node = g.append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(this.nodes)
            .join("circle")
            .attr("r", d => d.type === "file" ? 20 : 8)
            .attr("fill", d => d.type === "file" ? "#ff6b6b" : "#4ecdc4")
            .attr("cursor", "grab")
            .call(this._dragBehavior()); // Вызов приватного метода драг-н-дропа

        const labels = g.append("g")
            .selectAll("text")
            .data(this.nodes)
            .join("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.id)
            .style("font-size", d => d.type === "file" ? "14px" : "10px")
            .style("pointer-events", "none")
            .style("fill", "#ccc");

        // 4. Тик симуляции
        this.simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            labels
                .attr("x", d => d.x)
                .attr("y", d => d.y);
        });

        // 5. Зум
        svg.call(d3.zoom()
            .scaleExtent([0.1, 8])
            .on("zoom", (event) => g.attr("transform", event.transform)));
    }

    // --- Публичные методы управления ---

    freeze() {
        this.simulation.stop();
        this.nodes.forEach(d => {
            d.fx = d.x;
            d.fy = d.y;
        });
    }

    unfreeze() {
        this.nodes.forEach(d => {
            d.fx = null;
            d.fy = null;
        });
        this.simulation.alpha(1).restart();
    }

    // --- Приватные методы (внутренняя логика) ---

    _dragBehavior() {
        const sim = this.simulation; // Сохраняем ссылку на симуляцию

        return d3.drag()
            .on("start", function(event) {
                if (!event.active) sim.alphaTarget(0.3).restart();
                event.subject.fx = event.subject.x;
                event.subject.fy = event.subject.y;
                d3.select(this).attr("cursor", "grabbing");
            })
            .on("drag", function(event) {
                event.subject.fx = event.x;
                event.subject.fy = event.y;
            })
            .on("end", function(event) {
                if (!event.active) sim.alphaTarget(0);
                // Sticky behavior: НЕ обнуляем fx/fy, чтобы узел остался там, где бросили
                d3.select(this).attr("cursor", "grab");
            });
    }
}
