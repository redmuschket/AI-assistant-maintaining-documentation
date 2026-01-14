export function parseGraphData(rawData) {
    const nodes = [];
    const links = [];
    const nodeSet = new Set();

    function addNode(id, type) {
        if (!nodeSet.has(id)) {
            nodes.push({ id: id, type: type });
            nodeSet.add(id);
        }
    }

    Object.entries(rawData).forEach(([fileName, relationships]) => {
        // Добавляем главный узел (файл)
        addNode(fileName, "file");

        relationships.forEach(relName => {
            // Добавляем зависимый узел (связь)
            addNode(relName, "rel");
            // Создаем линк
            links.push({ source: fileName, target: relName });
        });
    });

    return { nodes, links };
}