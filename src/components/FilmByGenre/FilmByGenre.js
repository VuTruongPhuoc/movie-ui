import React from 'react';
import classNames from 'classnames/bind';
import styles from './FilmByGenre.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);
const filmsList = [
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
    {
        img: 'https://pic2.iqiyipic.com/image/20240822/54/60/a_100583425_m_601_en_260_360.webp',
        episode: 12,
        name: 'Sieu nhan',
    },
];

const FilmByGenre = ({ title }) => {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('film-by-genre')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('child-container')}>
                    {filmsList.map((child, index) => (
                        <Link className={cx('child-item')} key={index} to={config.routes.album}>
                            <img className={cx('child-img')} src={child.img} alt={child.name} />
                            <span className={cx('child-episode')}>{child.episode}</span>
                            <span className={cx('child-name')}>{child.name}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FilmByGenre;
