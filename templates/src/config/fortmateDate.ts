const dateFormate = (dateTime: Date) => {
    const minute = Math.abs(new Date().getTime() - dateTime.getTime()) / 6e4;
    if (minute < 60) {
        return `${parseInt(minute + "")} phút`;
    }

    const hour = minute / 60;

    if (hour < 24) {
        return `${parseInt(hour + "")} giờ`;
    }
    const day = hour / 24;
    if (day < 4) {
        return `${parseInt(day + "")} ngày`;
    }

    const year = dateTime.getFullYear();
    const month = dateTime.getMonth() + 1;
    const date = dateTime.getDate();

    return `${date}/${month}/${year}`;
};
export default dateFormate;
