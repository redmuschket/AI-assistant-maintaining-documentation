import { parseGraphData } from './modules/parser.js';
import { NetworkGraph } from './modules/graph.js';

// 1. Входные данные (могут прийти через fetch / data-attributes)
const rawData = {
    "auth.py": ["db", "utils"],
    "main.py": ["auth.py", "logging"],
    "utils": ["logging"]
};

// 2. Инициализация
const graph = new NetworkGraph("#graph-container");
const cleanData = parseGraphData(rawData);

graph.render(cleanData);

// 3. Подключение кнопок
const btnFreeze = document.getElementById('btn-freeze');
const btnRelease = document.getElementById('btn-release');

btnFreeze.addEventListener('click', () => {
    graph.freeze();
    btnFreeze.classList.add('active');
    btnRelease.classList.remove('active');
});

btnRelease.addEventListener('click', () => {
    graph.unfreeze();
    btnRelease.classList.add('active');
    btnFreeze.classList.remove('active');
});
