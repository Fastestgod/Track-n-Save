//sideprofile
document.getElementById("username").innerText = localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  sidebar.classList.toggle("active");
});

document.addEventListener("DOMContentLoaded", function() {
  // Make sure the logout button exists before adding the event listener
  const logoutBtn = document.getElementById("logoutBtn");
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (event) {
      // Remove data from localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("fullname");
      localStorage.removeItem("email");

      // Show SweetAlert success message after logout
      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Redirect to login page after the alert
        window.location.href = "login.html";
      });
    });
  }
});
            
// Event listener for form submission
document.getElementById("usernameForm").addEventListener("submit", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the new username from the input field
  const newUsername = document.getElementById("username").value;

  // Check if the username is not empty
  if (newUsername.trim() !== "") {
    // Save the new username to localStorage
    localStorage.setItem("fullname", newUsername);

    // Update the profile view with the new username
    document.getElementById("username").innerText = newUsername;

    // Optionally, show a success message (e.g., using SweetAlert)
    Swal.fire({
      icon: "success",
      title: "Username Updated",
      text: "Your username has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    // Optionally, clear the input field after submission
    document.getElementById("username").value = "";

  } else {
    // Show an error message if the username is empty
    Swal.fire({
      icon: "error",
      title: "Invalid Username",
      text: "Username cannot be empty.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
});
// Event listener for Password form submission
document.getElementById("passwordForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const currentPassword = document.getElementById("current-password").value;
  const newPassword = document.getElementById("new-password").value;

  // Assuming you are verifying the current password somehow before allowing the update
  if (currentPassword && newPassword) {
    // Update password (assuming you're storing password in localStorage)
    localStorage.setItem("password", newPassword);

    Swal.fire({
      icon: "success",
      title: "Password Updated",
      text: "Your password has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    document.getElementById("current-password").value = ""; // Clear input
    document.getElementById("new-password").value = ""; // Clear input
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Password",
      text: "Both fields are required.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
});

// Event listener for Email form submission
document.getElementById("emailForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const newEmail = document.getElementById("email").value;

  if (newEmail.trim() !== "") {
    localStorage.setItem("email", newEmail);
    document.getElementById("email").innerText = newEmail;

    Swal.fire({
      icon: "success",
      title: "Email Updated",
      text: "Your email has been updated successfully.",
      timer: 1500,
      showConfirmButton: false,
    });

    document.getElementById("email").value = ""; // Clear input
  } else {
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: "Email cannot be empty.",
      timer: 1500,
      showConfirmButton: false,
    });
  }
});

