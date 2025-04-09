document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    content.classList.remove('hidden');

    const nameContainer = document.querySelector('.name-container');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    nameContainer.addEventListener('mouseenter', () => {
        dropdownMenu.style.display = 'block';
    });

    const header = document.querySelector('header');
    header.addEventListener('mouseleave', (event) => {
        const isInsideHeader = header.contains(event.relatedTarget);
        if (!isInsideHeader) {
            dropdownMenu.style.display = 'none';
        }
    });

    const graphContainers = document.querySelectorAll('.graph-container');
    const chartInstances = new Map(); // To keep track of loaded charts

    const trafficData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Website Visits',
            data: [1500, 1800, 2200, 1900, 2500, 2100],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
        }]
    };

    const techData = {
        labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
        datasets: [{
            label: 'Technology Usage',
            data: [30, 25, 40, 15, 20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ],
            borderWidth: 1
        }]
    };

    const completionData = {
        labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024', 'Q1 2025'],
        datasets: [{
            label: 'Project Completion Rate (%)',
            data: [85, 90, 78, 92, 88],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true
        }]
    };

    function createChart(container, chartType, data) {
        const canvas = container.querySelector('canvas');
        if (canvas && !chartInstances.has(canvas.id)) {
            const ctx = canvas.getContext('2d');
            const chart = new Chart(ctx, {
                type: chartType,
                data: data,
            });
            chartInstances.set(canvas.id, chart);
        }
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        graphContainers.forEach(container => {
            if (isElementInViewport(container)) {
                const chartId = container.querySelector('canvas').id;
                if (!chartInstances.has(chartId)) {
                    if (chartId === 'barChart') {
                        createChart(container, 'bar', trafficData);
                    } else if (chartId === 'pieChart') {
                        createChart(container, 'pie', techData);
                    } else if (chartId === 'lineChart') {
                        createChart(container, 'line', completionData);
                    }
                }
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on load
});