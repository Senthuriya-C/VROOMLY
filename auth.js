// ===============================
// VROOMLY AUTHENTICATION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    // ===============================
    // PASSWORD SHOW / HIDE
    // ===============================

    window.togglePassword = function (inputId, button) {

        const input = document.getElementById(inputId);

        if (!input) {
            return;
        }

        if (input.type === "password") {
            input.type = "text";

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            }

        } else {
            input.type = "password";

            const icon = button.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        }
    };


    // ===============================
    // REGISTER
    // ===============================

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", async function (event) {

            event.preventDefault();

            const name =
                document.getElementById("fullName").value.trim();

            const email =
                document.getElementById("registerEmail").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const password =
                document.getElementById("registerPassword").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;


            // Check password confirmation

            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;
            }


            try {

                const response = await fetch(
                    "http://localhost:8080/auth/register",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            fullName: name,
                            email: email,
                            phone: phone,
                            password: password
                        })
                    }
                );


                const data = await response.json();


                if (response.ok) {

                    // Store basic user information only.
                    // Password is NEVER stored.

                    localStorage.setItem(
                        "vroomlyUserName",
                        name
                    );

                    localStorage.setItem(
                        "vroomlyUserEmail",
                        email
                    );

                    localStorage.setItem(
                        "vroomlyUserPhone",
                        phone
                    );


                    alert("Account created successfully!");


                    window.location.href = "login.html";

                } else {

                    alert(
                        data.message ||
                        "Registration failed."
                    );
                }


            } catch (error) {

                console.error(
                    "Registration Error:",
                    error
                );

                alert(
                    "Unable to connect to server. " +
                    "Please make sure Spring Boot is running."
                );
            }
        });
    }


    // ===============================
    // LOGIN
    // ===============================

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                const emailInput =
                    document.getElementById("email") ||
                    document.getElementById("loginEmail");

                const passwordInput =
                    document.getElementById("password") ||
                    document.getElementById("loginPassword");


                if (!emailInput || !passwordInput) {

                    alert(
                        "Login fields could not be found."
                    );

                    return;
                }


                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                try {

                    const response = await fetch(
                        "http://localhost:8080/auth/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email: email,
                                password: password
                            })
                        }
                    );


                    const data =
                        await response.json();


                    if (response.ok) {

                        localStorage.setItem(
                            "vroomlyLoggedIn",
                            "true"
                        );

                        localStorage.setItem(
                            "vroomlyUserEmail",
                            email
                        );


                        alert(
                            "Login successful!"
                        );


                        window.location.href =
                            "dashboard.html";

                    } else {

                        alert(
                            data.message ||
                            "Invalid email or password."
                        );
                    }


                } catch (error) {

                    console.error(
                        "Login Error:",
                        error
                    );

                    alert(
                        "Unable to connect to server. " +
                        "Please make sure Spring Boot is running."
                    );
                }
            }
        );
    }


    // ===============================
    // FORGOT PASSWORD
    // ===============================

    window.forgotPassword = function () {

        const email =
            prompt("Enter your registered email:");

        if (!email) {
            return;
        }

        const savedEmail =
            localStorage.getItem("vroomlyUserEmail");


        if (
            savedEmail &&
            email.trim().toLowerCase() ===
            savedEmail.toLowerCase()
        ) {

            alert(
                "Your email is registered.\n\n" +
                "Password reset will be connected " +
                "to the backend in the next security step."
            );

        } else {

            alert(
                "Email not found. " +
                "Please check your email."
            );
        }
    };

});