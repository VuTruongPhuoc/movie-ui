import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import * as historyServices from '~/services/historyServices';
import * as filmServices from '~/services/filmServices';
import styles from './History.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const History = () => {
    const [histories, setHistories] = useState([]);
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmsResult = await filmServices.getall();
                setFilms(filmsResult);

                const historyResult = historyServices.get();
                setHistories(historyResult);
            } catch (error) {}
        };

        fetchData();
    }, []);
    const mergedFilms = films.map((film) => {
        const history = histories.find((history) => history.id === film.id);
        return {
            ...film,
            episode: history ? history.episode : null,
        };
    });
    const historyFilms = mergedFilms.filter((film) => histories.some((history) => history.id === film.id));

    return (
        <div className={cx('history-container')}>
            <h2 className={cx('section-title')}>Danh sách lịch sử xem phim</h2>
            {historyFilms && historyFilms.length > 0 ? (
                historyFilms.map((item) => (
                    <div key={item.id} className={cx('history-item')}>
                        <Link to={`${config.routes.watch}/${item.slug}/${item.episode}`}>
                            <div className={cx('history-item-content')}>
                                <div className={cx('history-item-poster')}>
                                    <img src={item.posterUrl} alt={item.name} className={cx('history-item-image')} />
                                </div>
                                <div className={cx('history-item-details')}>
                                    <h3 className={cx('history-item-title')}>{item.name}</h3>
                                    <p className={cx('history-item-episode')}>
                                        Bạn đã xem tập {item.episode.split('-')[1]}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className={cx('no-history')}>Chưa có lịch sử xem phim nào</div>
            )}
        </div>
    );
};

export default History;
