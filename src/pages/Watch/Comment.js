import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useState } from 'react';

import * as commentServices from '~/services/commentServices';
import styles from './Watch.module.scss';
import formatDate from '~/utils/formatDate';
import Button from '~/components/Button';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Comment = ({ filmId }) => {
    const [comments, setComments] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [visibleComments, setVisibleComments] = useState(4); // Hiển thị 4 bình luận đầu tiên

    useEffect(() => {
        const fetchCommentData = async () => {
            if (filmId) {
                const result = await commentServices.getByFilm(filmId);
                setComments(result);
            }
        };
        fetchCommentData();
    }, [filmId]);

    const handlePostComment = async () => {
        const response = await commentServices.add(filmId, commentContent);
        setCommentContent('');
        setComments([response.comment, ...comments]);
        toast.success(response.message);
    };

    // Hàm để hiển thị thêm bình luận
    const handleShowMoreComments = () => {
        setVisibleComments(visibleComments + 4); // Thêm 4 bình luận
    };

    return (
        <div className={cx('watch-comment')}>
            <div className={cx('comment-title')}>
                <FontAwesomeIcon icon={faComment} className={cx('comment-icon')} />
                <p className={cx('title')}>Bình luận ({comments.length})</p>
            </div>
            <div className={cx('comment-frame')}>
                <div className={cx('comment-input')}>
                    <textarea
                        className={cx('comment-content')}
                        placeholder="Nhập bình luận của bạn tại đây"
                        rows={3}
                        maxLength={5000}
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                    ></textarea>
                </div>
                <div className={cx('comment-btn')}>
                    <Button primary onClick={handlePostComment}>
                        Gửi
                    </Button>
                </div>
            </div>
            <div className={cx('comments-list')}>
                {comments.slice(0, visibleComments).map((item, index) => (
                    <div className={cx('comment-item')} key={item.id}>
                        <div className={cx('avatar')}>
                            <img src={item.user.avatarUrl} alt={item.user.displayName} />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('displayname')}>{item.user.displayName}</div>
                            <div className={cx('content')}>{item.content}</div>
                            <div className={cx('reply')}>
                                <div className={cx('reply-content')}>Trả lời</div>
                                <div className={cx('reply-date')}>{formatDate(new Date(item.createDate))}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {visibleComments < comments.length && (
                <div onClick={handleShowMoreComments} className={cx('show-more')}>
                    Tải thêm bình luận
                </div>
            )}
        </div>
    );
};

export default Comment;
