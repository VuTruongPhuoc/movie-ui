import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames/bind';
import styles from './FilmByGenre.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';

const cx = classNames.bind(styles);

const FilmByGenre = ({ title, filmsList }) => {
    return (
        <div className={cx('wrapper')}>
            <section className={cx('film-by-genre')}>
                <div className={cx('title')}>{title}</div>
                <div className={cx('child-container')}>
                    {filmsList &&
                        filmsList.map((child, index) => (
                            <Link className={cx('child-item')} key={index} to={`${config.routes.album}/${child.slug}`}>
                                <div className={cx('img-area')}>
                                    <img className={cx('child-img')} src={child.imageUrl} alt={child.name} />
                                    <span className={cx('child-episode')}>Tập {child.numberOfEpisodes}</span>
                                </div>
                                <span className={cx('child-name')}>{child.name}</span>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    );
};

FilmByGenre.propTypes = {
    title: PropTypes.string,
    filmsList: PropTypes.array,
};

export default FilmByGenre;
