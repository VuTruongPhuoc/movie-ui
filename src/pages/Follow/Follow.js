import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';

import * as followServices from '~/services/followServices';
import * as filmServices from '~/services/filmServices';
import styles from './Follow.module.scss';
import config from '~/config';

const cx = classNames.bind(styles);

const Follow = () => {
    const [filmIds, setFilmIds] = useState();
    const [films, setFilms] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const filmsResult = await filmServices.getall();
                setFilms(filmsResult);

                const followResult = await followServices.get();
                setFilmIds(followResult);
            } catch (error) {}
        };

        fetchData();
    }, []);
    let followedFilms = [];
    if (films) {
        followedFilms = films.filter((film) => filmIds.includes(film.id));
    }

    return (
        <div className={cx('followed-films-container')}>
            <h2 className={cx('section-title')}>Danh Sách Phim Theo Dõi</h2>
            {followedFilms && followedFilms.length > 0 ? (
                followedFilms.map((item) => (
                    <div key={item.id} className={cx('followed-film-item')}>
                        <Link to={`${config.routes.watch}/${item.slug}`}>
                            <div className={cx('followed-film-content')}>
                                <div className={cx('followed-film-poster')}>
                                    <img src={item.posterUrl} alt={item.name} className={cx('followed-film-image')} />
                                </div>
                                <div className={cx('followed-film-details')}>
                                    <h3 className={cx('followed-film-title')}>{item.name}</h3>
                                    <p className={cx('followed-film-episode')}>Tập mới nhất: {item.numberOfEpisodes}</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div className={cx('no-followed-films')}>Bạn chưa theo dõi phim nào</div>
            )}
        </div>
    );
};

export default Follow;
