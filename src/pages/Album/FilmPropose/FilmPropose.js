import classNames from 'classnames/bind';
import styles from './FilmPropose.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const FilmPropose = ({ filmProPoseList = [] }) => {
    return (
        <div className={'wrapper'}>
            <div className={cx('film-propose-list')}>
                {filmProPoseList.map((item, index) => (
                    <div className={cx('film-propose-item')}>
                        <div className={cx('video-img')}>
                            <img src={item.img} alt="" />
                            <div className={cx('video-episode')}>{item.newepisode}</div>
                            <div className={cx('video-play')}>
                                <FontAwesomeIcon icon={faPlay} className={cx('video-icon')} />
                            </div>
                        </div>
                        <div className={cx('video-name')}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilmPropose;
