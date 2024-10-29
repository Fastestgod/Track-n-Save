// Bar Chart
const barCtx = document.getElementById('barChart').getContext('2d');
new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Spending',
            data: [1200, 950, 1100, 1500, 900, 1300, 1700, 1200, 1400, 1500, 1000, 1200],
            backgroundColor: '#613DB6',
            borderRadius: 5,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Pie Chart
const pieCtx = document.getElementById('pieChart').getContext('2d');
new Chart(pieCtx, {
    type: 'doughnut',
    data: {
        labels: ['Rent', 'Food', 'Entertainment', 'Savings'],
        datasets: [{
            data: [40, 25, 20, 15],
            backgroundColor: ['#613DB6', '#3b82f6', '#f97316', '#10b981']
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});
