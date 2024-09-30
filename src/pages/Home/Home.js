import classNames from 'classnames/bind';

import * as filmServices from '~/services/filmServices';
import styles from './Home.module.scss';
import RowSlider from '~/components/RowSlider';
import FilmByGenre from '~/components/FilmByGenre';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Home() {
    const [filmsList, setFilmsList] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await filmServices.getall();
                setFilmsList(result);
            } catch (error) {
                console.error('Error fetching films:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('row-container')}>
                <RowSlider title={'Phim hành động mới'} filmsList={filmsList} />
                <FilmByGenre title={'Phim hay nhat'} filmsList={filmsList} />
                <FilmByGenre title={'Phim dam boc'} />
            </div>
        </div>
    );
}

export default Home;
