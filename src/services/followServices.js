const add = (id) => {
    const follow = JSON.parse(localStorage.getItem(process.env.REACT_APP_DATA_FOLLOW)) || [];
    follow.push(id);
    localStorage.setItem(process.env.REACT_APP_DATA_FOLLOW, JSON.stringify(follow));
};
const get = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_DATA_FOLLOW)) || [];
};

export { add, get };
