document.addEventListener('DOMContentLoaded', function() {
    const dataElement = document.getElementById('tours-data');
    if (!dataElement) return;

    let toursData = JSON.parse(dataElement.textContent);

    if (typeof toursData === 'string') {
        toursData = JSON.parse(toursData);
    }

    if (!Array.isArray(toursData)) return;

    toursData.forEach(tour => {
        const chartCanvas = document.getElementById(`expenseChart-${tour.id}`);
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: tour.chart_data.labels,
                    datasets: [{
                        data: tour.chart_data.values,
                        backgroundColor: tour.chart_data.colors,
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                boxWidth: 10,
                                font: { size: 10 }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Структура бюджета',
                            font: { size: 11 },
                            color: '#666'
                        }
                    },
                    cutout: '65%',
                }
            });
        }
    });
});
