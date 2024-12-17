//<toggle dark mode and sidebar>
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
//<toggle dark mode and sidebar>

document
  .getElementById("transactionForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    const amount = parseFloat(document.getElementById("amount").value);

    console.log("Date:", date);
    console.log("Description:", description);
    console.log("Category:", category);
    console.log("Amount:", amount);

    if (!date || !description || !category || isNaN(amount)) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all fields correctly.",
      });
    }

    const transaction = { date, description, category, amount };

    try {
      const response = await saveTransaction(transaction);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "The transaction was added successfully.",
      });

      addTransactionToTable(response);
      document.getElementById("transactionForm").reset();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save the transaction. Please try again.",
      });
    }
  });

function addTransactionToTable(transaction) {
  const tableBody = document.getElementById("transactionTable");

  const newRow = document.createElement("tr");
  newRow.innerHTML = `
      <td>${transaction.date}</td>
      <td>${transaction.description}</td>
      <td>${transaction.category}</td>
      <td>${transaction.amount.toFixed(2)}</td>
      <td>
        <span class="hidden-id" style="display: none;">${transaction._id}</span>
        <button class="delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="red">
            <path d="M3 6h18v2H3zm2 4h14l-1.5 12h-11zM10 2h4v2h5v2H5V4h5z" />
          </svg>
        </button>
      </td>
    `;

  tableBody.appendChild(newRow);
}

async function loadData() {
  let transactions = await getTransactions();
  for (const transaction of transactions) {
    addTransactionToTable(transaction);
  }
}

async function saveTransaction(transaction) {
  const url = `/api/save`;
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    alert("No token found, please login.");
    return;
  }

  try {
    const response = await axios.post(url, transaction, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

async function getTransactions() {
  const url = `/api`;
  const authToken = localStorage.getItem("authToken");

  if (!authToken) {
    alert("No token found, please login.");
    return;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
}

loadData();
//change displayed username n email
//document.getElementById('username').textContent=;
//document.getElementById('email').textContent =;

//DELETE ROW
document.addEventListener("click", async (e) => {
  const deleteButton = e.target.closest(".delete-btn");
  if (deleteButton) {
    const row = deleteButton.closest("tr");

    const transactionId = row.querySelector(".hidden-id")?.textContent;

    if (!transactionId) {
      console.error("No ID found for the transaction.");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          alert("No token found, please login.");
          return;
        }
        const response = await axios.post(
          url,
          { _id: transactionId },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (response.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Your transaction has been deleted.",
            icon: "success",
          });

          row.remove();
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an error deleting the transaction.",
          icon: "error",
        });
        console.error("Error deleting transaction:", error);
      }
    }
  }
});

let authToken = null;

function checkAuthToken() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    window.location.href = "login.html";
  } else {
    authToken = token;
    console.log("Token found:", authToken);
  }
}

checkAuthToken();

document.getElementById("username").innerText =
  localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");
