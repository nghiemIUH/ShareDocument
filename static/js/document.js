const addDowmload = async (id) => {
    const csrftoken = document.querySelector(
        "[name=csrfmiddlewaretoken]"
    ).value;

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
        .then((data) => {});
};

const buyDocument = (is_authenticated, doc_price, user_balance) => {
    if (is_authenticated) return true;
    return doc_price < user_balance;
};
