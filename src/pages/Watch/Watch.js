import classNames from 'classnames/bind';
import React from 'react';
import ReactPlayer from 'react-player';

import styles from './Watch.module.scss';
import RowSlider from '~/components/RowSlider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const episodesList = [
    { name: '1', link: 'fsljasf' },
    { name: '2', link: 'fsljasf' },
    { name: '3', link: 'fsljasf' },
    { name: '4', link: 'fsljasf' },
    { name: '5', link: 'fsljasf' },
    { name: '6', link: 'fsljasf' },
];
const commentsList = [
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
    {
        avatar: 'https://animehay.biz/upload/avatar/40659.jpg?t=1678591957',
        displayname: 'hihihi',
        content: 'phim hay',
        createdate: 'hihihih',
    },
];

const watch = () => {
    const videoBlob = new Blob(['https://youtu.be/iu-LBY7NXD4'], { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('watch-area')}>
                <div className={cx('video-player')}>
                    <ReactPlayer
                        className={cx('player')}
                        url="https://youtu.be/mobl4W2aIFA"
                        controls={true}
                        style={{ maxWidth: '1170px', minHeight: '540px' }}
                        width="100%"
                        height="540px"
                    />
                </div>
                <div className={cx('video-episode')}>
                    <div className={cx('episode-header')}>Danh sách tập</div>
                    <div className={cx('episodes-list')}>
                        {episodesList.map((item, index) => (
                            <div className={cx('episode-item')} key={index}>
                                {item.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className={cx('watch-recommend')}>
                <RowSlider title={'Đề xuất'} />
            </div>
            <div className={cx('watch-comment')}>
                <div className={cx('comment-title')}>
                    <FontAwesomeIcon icon={faComment} className={cx('comment-icon')} />
                    <p className={cx('title')}>Bình luận (1000)</p>
                </div>
                <div className={cx('comment-frame')}>
                    <div className={cx('comment-input')}>
                        <textarea
                            className={cx('comment-content')}
                            placeholder="Nhập bình luận của bạn tại đây"
                            rows={3}
                            maxLength={5000}
                        ></textarea>
                    </div>
                    <div className={cx('comment-btn')}>
                        <Button primary>Gửi</Button>
                    </div>
                </div>
                <div className={cx('comments-list')}>
                    {commentsList.map((item, index) => (
                        <div className={cx('comment-item')} key={index}>
                            <div className={cx('avatar')}>
                                <img src={item.avatar} alt="" />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('displayname')}>{item.displayname}</div>
                                <div className={cx('content')}>{item.content}</div>
                                <div className={cx('reply-date')}>{item.createdate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default watch;
