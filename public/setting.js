//sideprofile
document.getElementById("username").innerText = localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", (event) => {
  event.stopPropagation();
  sidebar.classList.toggle("active");
});

document.getElementById("logoutBtn")
        .addEventListener("click", async function (event) {
          
              localStorage.removeItem("authToken");
              localStorage.removeItem("fullname");
              localStorage.removeItem("email");

              Swal.fire({
                icon: "success",
                title: "Logged Out",
                text: "You have been logged out successfully.",
                timer: 1500,
                showConfirmButton: false,
              }).then(() => {
                window.location.href = "login.html";
              });
             });
            
// Event listener for form submission
document.getElementById("usernameForm").addEventListener("submit", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the new username from the input field
  const newUsername = document.getElementById("username").value;

  // Check if the username is not empty
  if (newUsername.trim() !== "") {
    // Save the new username to localStorage
    localStorage.setItem("fullname", newUsername);

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