//sideprofile
document.getElementById("username").innerText = localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  sidebar.classList.toggle("active");
});

const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage

document.getElementById("username").innerText = localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");

// Update Username
document.getElementById("usernameForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const newUsername = document.getElementById("usernameInput").value;

  if (newUsername.trim() !== "") {
    const response = await fetch('/update-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, fullname: newUsername }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("fullname", newUsername); // Update in localStorage for the session
      document.getElementById("username").innerText = newUsername;

      Swal.fire({
        icon: "success",
        title: "Username Updated",
        text: "Your username has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "An error occurred.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
});

// Update Email
document.getElementById("emailForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const newEmail = document.getElementById("emailInput").value;

  if (newEmail.trim() !== "") {
    const response = await fetch('/update-user', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, email: newEmail }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("email", newEmail);
      document.getElementById("email").innerText = newEmail;

      Swal.fire({
        icon: "success",
        title: "Email Updated",
        text: "Your email has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "An error occurred.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
});

// Update Password
document.getElementById("passwordForm").addEventListener("submit", async function (event) {
  event.preventDefault();
  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;

  if (currentPassword && newPassword) {
    const response = await fetch('/update-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, currentPassword, newPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "Password Updated",
        text: "Your password has been updated successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: data.message || "An error occurred.",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }
});

// Logout
document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.clear();
  window.location.href = "login.html"; // Redirect to login page
});
