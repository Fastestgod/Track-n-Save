document.getElementById('theme-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode');
});

// Initialize overview bar chart
const ctxOverview = document.getElementById('overviewChart').getContext('2d');
const overviewChart = new Chart(ctxOverview, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Monthly Spending',
            data: [300, 500, 400, 700, 1000, 900, 600, 800, 700, 850, 950, 1200],
            backgroundColor: '#9b51e0',
            borderRadius: 5
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// Initialize activity pie chart
const ctxActivity = document.getElementById('activityChart').getContext('2d');
const activityChart = new Chart(ctxActivity, {
    type: 'doughnut',
    data: {
        labels: ['Savings', 'Expenses', 'Investments'],
        datasets: [{
            label: 'Activity Breakdown',
            data: [60, 25, 15],
            backgroundColor: ['#9b51e0', '#4f4f4f', '#bdbdbd'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'right'
            }
        }
    }
});
