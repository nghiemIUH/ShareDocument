const validate_pass = () => {
    const pass = document.getElementById("password").value;
    const error = document.getElementById("err_pass");
    if (pass.length === 0) {
        error.style.display = "block";
        error.innerHTML = "Password not empty";
        return false;
    }
    error.style.display = "none";
    return true;
};

const validate_pass_cf = () => {
    const pass = document.getElementById("password").value;
    const pass_cf = document.getElementById("password_cf").value;
    const error = document.getElementById("err_pass_cf");
    if (pass_cf.length === 0) {
        error.style.display = "block";
        error.innerHTML = "Password not empty";
        return false;
    }
    if (pass !== pass_cf) {
        error.style.display = "block";
        error.innerHTML = "Password not match";
        return false;
    }
    error.style.display = "none";
    return true;
};
const form = document.getElementById("register_form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!(validate_pass_cf() && validate_pass())) return;
    const formData = new FormData(form);
    await fetch("", { method: "POST", body: formData })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data["err_username"]) {
                Toastify({
                    text: data["err_username"],
                    className: "error",
                    duration: 2000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "red",
                        borderRadius: "5px",
                    },
                    offset: {
                        x: 0,
                        y: 50,
                    },
                    onClick: function () {},
                }).showToast();
            } else if (data["err_email"]) {
                Toastify({
                    text: data["err_email"],
                    className: "error",
                    duration: 2000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "red",
                        borderRadius: "5px",
                    },
                    offset: {
                        x: 0,
                        y: 50,
                    },
                    onClick: function () {},
                }).showToast();
            } else {
                Toastify({
                    text: "Success redirect to home",
                    className: "error",
                    duration: 2000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "red",
                        borderRadius: "5px",
                    },
                    offset: {
                        x: 0,
                        y: 50,
                    },
                    onClick: function () {},
                }).showToast();
                document.location.href = "/";
            }
        });
});
