import classNames from 'classnames/bind';

import * as filmServices from '~/services/filmServices';
import styles from './TVShows.module.scss';
import FilmByGenre from '~/components/FilmByGenre';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const TVShows = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await filmServices.getByType(pageNumber, pageSize, '0');
            setFilms(response.data.items);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>{films && <FilmByGenre title="Phim bộ" filmsList={films}></FilmByGenre>}</div>
    );
};

export default TVShows;
