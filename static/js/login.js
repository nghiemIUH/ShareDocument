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
                //
            }
        });
});
