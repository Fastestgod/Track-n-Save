// settings.js

// Fetch user data from localStorage and populate fields
document.addEventListener("DOMContentLoaded", () => {
  const usernameField = document.querySelector("#username");
  const emailField = document.querySelector("#email");
  const logoutBtn = document.querySelector("#logoutBtn");

  // Fetch stored user data
  const fullname = localStorage.getItem("fullname");
  const email = localStorage.getItem("email");

  if (fullname) document.querySelector("#username").value = fullname;
  if (email) document.querySelector("#email").value = email;

  // Display user profile in the sidebar
  document.querySelector(".profile p#username").textContent = fullname || "Guest";
  document.querySelector(".profile p#email").textContent = email || "No email";

  // Logout functionality
  logoutBtn.addEventListener("click", () => {
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

  // Handle Edit Username
  document.querySelector(".settings-section form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newUsername = usernameField.value;

    try {
      const token = localStorage.getItem("authToken");

      const res = await fetch("/api/user/update-username", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fullname: newUsername }),
      });

      if (!res.ok) throw new Error("Failed to update username.");

      Swal.fire("Success", "Username updated successfully!", "success");
      localStorage.setItem("fullname", newUsername);
      document.querySelector(".profile p#username").textContent = newUsername;
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  });

  // Handle Edit Password
  document
    .querySelector(".settings-section:nth-of-type(2) form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const currentPassword = document.querySelector("#current-password").value;
      const newPassword = document.querySelector("#new-password").value;

      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("/api/user/update-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ currentPassword, newPassword }),
        });

        if (!res.ok) throw new Error("Failed to update password.");

        Swal.fire("Success", "Password updated successfully!", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    });

  // Handle Edit Email
  document
    .querySelector(".settings-section:nth-of-type(3) form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const newEmail = emailField.value;

      try {
        const token = localStorage.getItem("authToken");

        const res = await fetch("/api/user/update-email", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email: newEmail }),
        });

        if (!res.ok) throw new Error("Failed to update email.");

        Swal.fire("Success", "Email updated successfully!", "success");
        localStorage.setItem("email", newEmail);
        document.querySelector(".profile p#email").textContent = newEmail;
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    });

  // Handle Profile Picture Upload
  document
    .querySelector(".settings-section:nth-of-type(4) form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const fileInput = document.querySelector("#profile-pic");
      const file = fileInput.files[0];

      if (!file) return Swal.fire("Error", "Please select a file.", "error");

      try {
        const formData = new FormData();
        formData.append("profilePic", file);

        const token = localStorage.getItem("authToken");

        const res = await fetch("/api/user/upload-profile-pic", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (!res.ok) throw new Error("Failed to upload picture.");

        Swal.fire("Success", "Profile picture uploaded!", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    });
});
