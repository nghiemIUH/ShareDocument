const addDowmload = async (id) => {
    const csrftoken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
    ).value;
    const formData = new FormData();
    formData.append("pk", id);
    formData.append("csrfmiddlewaretoken", csrftoken);

    await fetch("", {
        method: "PUT",
        body: JSON.stringify({ pk: id }),
        headers: {
            "X-CSRFToken": csrftoken,
        },
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};
