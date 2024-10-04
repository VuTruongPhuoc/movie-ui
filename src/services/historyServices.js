const add = (movie) => {
    const history = JSON.parse(localStorage.getItem(process.env.REACT_APP_DATA_HISTORY)) || [];
    history.push({
        id: movie.id,
        name: movie.name,
        episode: movie.episode,
        time: new Date().toISOString(),
    });
    localStorage.setItem(process.env.REACT_APP_DATA_HISTORY, JSON.stringify(history));
};
const update = (movie) => {
    const history = JSON.parse(localStorage.getItem(process.env.REACT_APP_DATA_HISTORY)) || [];

    const existingMovie = history.find((item) => item.id === movie.id);

    if (existingMovie) {
        if (movie.episode !== existingMovie.episode) {
            existingMovie.episode = movie.episode;
            existingMovie.time = new Date().toISOString();
        }
    } else {
        history.push({
            id: movie.id,
            name: movie.name,
            episode: movie.episode,
            time: new Date().toISOString(),
        });
    }

    localStorage.setItem(process.env.REACT_APP_DATA_HISTORY, JSON.stringify(history));
};
const get = () => {
    return JSON.parse(localStorage.getItem(process.env.REACT_APP_DATA_HISTORY)) || [];
};

export { add, update, get };
