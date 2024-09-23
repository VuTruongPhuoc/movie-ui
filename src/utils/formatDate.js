function formatDate(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Đối tượng truyền vào không hợp lệ');
    }
    let month = '' + (date.getMonth() + 1);
    let day = '' + date.getDate();
    const year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
}

export default formatDate;
