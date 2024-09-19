import classNames from 'classnames/bind';
import styles from './FilmPropose.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const FilmPropose = ({ filmProPoseList = [] }) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('film-propose-list')}>
                {filmProPoseList.map((item, index) => (
                    <div className={cx('film-propose-item')} key={index}>
                        <div className={cx('video-img')}>
                            <img src={item.img} alt="" />
                            <div className={cx('video-episode')}>{item.newepisode}</div>
                            <div className={cx('video-play')}>
                                <FontAwesomeIcon icon={faPlayCircle} className={cx('video-icon')} />
                            </div>
                        </div>
                        <div className={cx('video-name')}>{item.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilmPropose;
