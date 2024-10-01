export const getRandom = (item, n) => {
    const shuffled = [...item].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};
