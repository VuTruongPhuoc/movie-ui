import classNames from 'classnames/bind';
import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';

import styles from './Watch.module.scss';
import * as filmServices from '~/services/filmServices';
import config from '~/config';
import Comment from './Comment';

const cx = classNames.bind(styles);

const Watch = () => {
    const { slug, episode } = useParams();
    const [film, setFilm] = useState();
    const [episodes, setEpisodes] = useState();
    const [currentEpisode, setCurrentEpisode] = useState(episode);
    const [currentEpisodeLink, setCurrentEpisodeLink] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug, episode]);
    useEffect(() => {
        const fetchFilmData = async () => {
            const result = await filmServices.getbyslug(slug);
            setFilm(result.film);
            setEpisodes(result.episodes);
        };
        fetchFilmData();
    }, [slug]);
    const handleEpisodeSelect = (item = {}) => {
        setCurrentEpisode(item.slug);
    };
    useEffect(() => {
        if (episodes) {
            const selectedEpisode = episodes.find((ep) => ep.slug === currentEpisode);
            if (selectedEpisode) {
                setCurrentEpisodeLink(selectedEpisode.link);
            }
        }
    }, [episodes, currentEpisode]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('watch-area')}>
                <div className={cx('video-player')}>
                    <iframe
                        title="xem phim"
                        className={cx('player')}
                        src={currentEpisodeLink}
                        controls={true}
                        style={{ maxWidth: '1170px', minHeight: '540px' }}
                        width="100%"
                        height="540px"
                        allowFullScreen
                    />
                </div>
                <div className={cx('video-episode')}>
                    <div className={cx('episode-header')}>Danh sách tập</div>
                    <div className={cx('episodes-list')}>
                        {episodes &&
                            episodes
                                .slice()
                                .reverse()
                                .map((item, index) => (
                                    <NavLink
                                        className={cx('episode-item', { active: item.slug === currentEpisode })}
                                        key={index}
                                        onClick={() => handleEpisodeSelect({ slug: item.slug })}
                                        to={`${config.routes.watch}/${slug}/${item.slug}`}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}
                    </div>
                </div>
            </div>
            <div className={cx('watch-recommend')}>{/* <RowSlider title={'Đề xuất'} /> */}</div>
            <Comment filmId={film && film.id} />
        </div>
    );
};

export default Watch;
