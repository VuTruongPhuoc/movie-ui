import classNames from 'classnames/bind';
import styles from './FilmEpisode.module.scss';

const cx = classNames.bind(styles);

const FilmEpisode = ({ filmEpisodesList = [] }) => {
    return <div className={cx('wrapper')}></div>;
};

export default FilmEpisode;
