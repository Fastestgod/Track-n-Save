//sideprofile
document.getElementById("username").innerText = localStorage.getItem("fullname");
document.getElementById("email").innerText = localStorage.getItem("email");
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
                

            

