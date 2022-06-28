const form = document.getElementById("form_login");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    await fetch("", {
        method: "POST",
        mode: "same-origin",
        body: formData,
    })
        .then(function (response) {
            return response.json();
        })
        .then((data) => {
            data = JSON.parse(data);
            if (data.result === "success") document.location.href = "/";
            else {
                Toastify({
                    text: "Username or password not correct",
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
            }
        });
});
