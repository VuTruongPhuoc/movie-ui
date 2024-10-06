import classNames from 'classnames/bind';

import * as filmServices from '~/services/filmServices';
import styles from './Movies.module.scss';
import FilmByGenre from '~/components/FilmByGenre';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Movies = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(20);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await filmServices.getByType(pageNumber, pageSize, '1');
            setFilms(response.data.items);
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>{films && <FilmByGenre title="Phim lẻ" filmsList={films}></FilmByGenre>}</div>
    );
};

export default Movies;
