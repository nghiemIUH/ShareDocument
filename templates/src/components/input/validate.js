const rule_functions = {
    required: (value) => {
        if (value.length === 0) {
            return "Không được rỗng";
        }
    },
    email: (value) => {
        const mailformat =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!value.match(mailformat)) {
            return "Email chưa đúng";
        }
    },
};
const validate = (input_element) => {
    const rule = input_element.getAttribute("data-rule");
    const value = input_element.value;
    const input_id = input_element.id;
    if (rule.lenght === 0) {
        return "";
    }
    const rules = rule.split("|");
    let message = "";
    for (let i of rules) {
        const result = rule_functions[i](value);
        if (result) {
            message = result;
        }
    }

    document.getElementById(
        "error_message_" + input_id.split("_")[1]
    ).innerHTML = message;
    return message === "";
};

const isAllowSubmit = () => {
    const input_element = document.querySelectorAll("input[name][value]");
    const result = [];
    for (let e of input_element) {
        result.push(validate(e));
    }
    const sum = result.reduce((a, b) => {
        return a + b;
    }, 0);
    return sum === input_element.length;
};

export { validate, isAllowSubmit };
