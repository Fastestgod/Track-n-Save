let data = {};

async function loadData() {
  data = await getTransactions();
  initializeCharts();
  document.getElementById("total-balance").innerText = `$${data.totalBalance}`;
  document.getElementById(
    "total-spending"
  ).innerText = `$${data.totalSpending}`;
  document.getElementById("total-savings").innerText = `$${data.totalSavings}`;

  console.log(data);
}

loadData();

async function getTransactions() {
  const url = `/api/report`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

function initializeCharts() {
  // Bar Chart
  const barCtx = document.getElementById("barChart").getContext("2d");
  new Chart(barCtx, {
    type: "bar",
    data: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Spending",
          data: [
            data.spendingByMonthAndYear["jan"],
            data.spendingByMonthAndYear["feb"],
            data.spendingByMonthAndYear["mar"],
            data.spendingByMonthAndYear["apr"],
            data.spendingByMonthAndYear["may"],
            data.spendingByMonthAndYear["jun"],
            data.spendingByMonthAndYear["jul"],
            data.spendingByMonthAndYear["aug"],
            data.spendingByMonthAndYear["sep"],
            data.spendingByMonthAndYear["oct"],
            data.spendingByMonthAndYear["nov"],
            data.spendingByMonthAndYear["dec"],
          ],
          backgroundColor: "#613DB6",
          borderRadius: 5,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Pie Chart
  const pieCtx = document.getElementById("pieChart").getContext("2d");
  new Chart(pieCtx, {
    type: "doughnut",
    data: {
      labels: ["Income", "Expenses", "Savings"],
      datasets: [
        {
          data: [
            data.CurrentMonthTotals["income"],
            data.CurrentMonthTotals["expense"],
            data.CurrentMonthTotals["savings"],
          ],
          backgroundColor: ["#613DB6", "#3b82f6", "#f97316", "#10b981"],
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  });
}
//change displayed username n email
//document.getElementById('username').textContent=;
//document.getElementById('email').textContent =;


//toggle dark mode
document.getElementById("theme-toggle").addEventListener("change", function () {
  document.body.classList.toggle("dark-mode", this.checked);
});

const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (event) => {
  if (
    sidebar.classList.contains("active") &&
    !sidebar.contains(event.target) &&
    event.target !== menuToggle
  ) {
    sidebar.classList.remove("active");
  }
});
