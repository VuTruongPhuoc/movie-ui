import classNames from 'classnames/bind';
import { Link, useParams } from 'react-router-dom';
import { Fragment, useEffect, useRef, useState } from 'react';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPlay, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

import * as filmServices from '~/services/filmServices';
import Button from '~/components/Button';
import FilmPropose from './FilmPropose';
import styles from './Album.module.scss';
import { removeTags } from '~/utils/removeTags';
import config from '~/config';

const cx = classNames.bind(styles);

const filmProPoseList = [
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'one piece',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'naruto',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'marvel',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'jack',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
    {
        img: 'https://gophim.co/storage/hinh-anh/vong-xoay-than-toc-phan-6-thumb.jpg',
        newepisode: '22',
        name: 'messi',
    },
];

const buttonsNav = [{ name: 'Đề xuất cho bạn' }, { name: 'Danh sách tập' }];

function Album() {
    const { slug } = useParams();
    const [film, setFilm] = useState();
    const [episodes, setEpisodes] = useState();
    const [isExpanded, setIsExpanded] = useState(false);
    const [state, setState] = useState(buttonsNav[0]);
    const [defaultActive, setDefaultActive] = useState(buttonsNav[0]);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchFilmData = async () => {
            const result = await filmServices.getbyslug(slug);
            setFilm(result.film);
            setEpisodes(result.episodes);
        };
        fetchFilmData();
    }, [slug]);
    const divref = useRef();
    if (divref.current) {
        divref.current.style.webkitLineClamp = isExpanded ? 'unset' : 3;
    }
    const handleClickExpaned = () => {
        setIsExpanded(!isExpanded);
    };
    const handleClickNav = (name) => {
        setState({ active: name });
        setDefaultActive();
        setIsActive(!isActive);
    };
    return (
        <>
            {film && (
                <div className={cx('wrapper')}>
                    <div className={cx('film-banner')}>
                        <div className={cx('row')}>
                            <div className={cx('col-left')}>
                                <div className={cx('film-info')}>
                                    <div className={cx('film-info-title')}>{/* <h1> {film.name}</h1> */}</div>
                                    <div className={cx('film-info-top')}>
                                        <span className={cx('top')}>Đang chiếu</span>
                                        {film.originName}
                                    </div>
                                    <div className={cx('film-info-detail')}>
                                        <div className={cx('rate')}>
                                            <FontAwesomeIcon icon={faStar} /> 8.0
                                        </div>
                                        <div className={cx('year')}>{film.year}</div>
                                        <div className={cx('film-type')}>Phim bộ</div>
                                    </div>
                                    <div className={cx('film-info-tag')}>
                                        <span className={cx('key')}>Thể loại: </span>
                                        {film.categories.map((item, index) => (
                                            <Fragment key={index}>
                                                <Link to="">{item.name}</Link>
                                                {index < film.categories.length - 1 ? ', ' : ''}
                                            </Fragment>
                                        ))}
                                    </div>
                                    <div className={cx('film-info-content')} ref={divref}>
                                        {removeTags(film.description)}
                                        <div className={cx('more-info')} onClick={handleClickExpaned}>
                                            <span className={cx('more-info-text')}>
                                                {isExpanded ? 'Thu gọn giới thiệu' : 'Hiển thị thêm'}
                                            </span>
                                            <div className={cx('more-info-icon')}>
                                                {isExpanded ? (
                                                    <FontAwesomeIcon icon={faChevronUp} />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronDown} />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('film-info-desc')}>
                                        <div className={cx('group-btn')}>
                                            <Button
                                                className={cx('btn-play')}
                                                leftIcon={<FontAwesomeIcon icon={faPlay} />}
                                                primary
                                                to={`/watch/${slug}/tap-1`}
                                            >
                                                Xem phim
                                            </Button>
                                        </div>
                                        <div className={cx('film-info-btn')}>How date</div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-right')}>
                                <img className={cx('film-img')} src={film.posterUrl} alt="" />
                                <div className={cx('left-layer')}></div>
                                <div className={cx('bottom-layer')}></div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('film-option')}>
                        <div className={cx('col')}>
                            <div className={cx('nav')}>
                                {buttonsNav.map((item, index) => (
                                    <Button
                                        key={index}
                                        className={cx('nav-item', {
                                            active: defaultActive === item || state.active === item.name,
                                        })}
                                        onClick={() => handleClickNav(item.name)}
                                    >
                                        {item.name}
                                    </Button>
                                ))}
                            </div>
                            <div className={cx('content')}>
                                {isActive ? (
                                    <FilmPropose filmProPoseList={filmProPoseList} />
                                ) : (
                                    <div className={cx('film-episodes-list')}>
                                        {episodes &&
                                            episodes.map((item, index) => (
                                                <div className={cx('film-episode-item')}>
                                                    <Link to={`${config.routes.watch}/${slug}/${item.slug}`}>
                                                        <div className={cx('episode-img')}>
                                                            <img src={film.posterUrl} alt="" />
                                                            <div className={cx('episode-play')}>
                                                                <FontAwesomeIcon
                                                                    icon={faPlayCircle}
                                                                    className={cx('episode-icon')}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className={cx('episode-name')} key={index} src="" alt="">
                                                            {film.name + ' - tập ' + item.name}
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Album;
