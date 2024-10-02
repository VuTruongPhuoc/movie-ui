import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from 'react';

import * as commentServices from '~/services/commentServices';
import * as feedbackServices from '~/services/feedbackServices';
import styles from './Watch.module.scss';
import formatDate from '~/utils/formatDate';
import Button from '~/components/Button';
import { toast } from 'react-toastify';
import { isLoggedIn } from '~/services/authServices';
import AuthModals from '~/components/AuthModals';

const cx = classNames.bind(styles);

const Comment = ({ filmId }) => {
    const [comments, setComments] = useState([]);
    const [feedbacks, setFeedbacks] = useState([]);
    const [commentId, setCommentId] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [visibleComments, setVisibleComments] = useState(4);
    const [isShowAuthModal, setIsShowAuthModal] = useState(false);
    const [isShowFrameComment, setIsShowFrameComment] = useState(false);
    const replyRef = useRef(null);
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

    const handlePostReply = async () => {
        const response = await feedbackServices.add(commentId, replyContent);
        setReplyContent('');
        toast.success(response.message);
        setComments(
            comments.map((comment) => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        feedbacks: [...(comment.feedbacks || []), response.feedback],
                    };
                }
                return comment;
            }),
        );

        setIsShowFrameComment(false);
    };

    const handleShowMoreComments = () => {
        setVisibleComments(visibleComments + 4);
    };

    const handleLogin = () => {
        setIsShowAuthModal(true);
    };

    const handleShowFrameComment = (data = {}) => {
        setCommentId(data.id);
        setReplyContent('@' + data.name + ' ');
        setIsShowFrameComment(!isShowFrameComment);
        console.log(replyRef.current);
        if (replyRef.current) {
            replyRef.current.focus();
        }
    };

    return (
        <div className={cx('watch-comment')}>
            <div className={cx('comment-title')}>
                <FontAwesomeIcon icon={faComment} className={cx('comment-icon')} />
                <p className={cx('title')}>Bình luận ({comments.length || 0})</p>
            </div>
            {!isLoggedIn() ? (
                <div className={cx('login')}>
                    <div onClick={handleLogin} className={cx('btn-login')}>
                        Đăng nhập để bình luận
                    </div>
                    {isShowAuthModal && <AuthModals handleClose={() => setIsShowAuthModal(false)} />}
                </div>
            ) : (
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
            )}
            <div className={cx('comments-list')}>
                {comments.slice(0, visibleComments).map((item) => (
                    <div key={item.id}>
                        <div className={cx('comment-item')}>
                            <div className={cx('avatar')}>
                                <img src={item.user.avatarUrl} alt={item.user.displayName} />
                            </div>
                            <div className={cx('user-info')}>
                                <div className={cx('displayname')}>{item.user.displayName}</div>
                                <div className={cx('content')}>{item.content}</div>
                                <div className={cx('reply')}>
                                    {isLoggedIn() && (
                                        <div
                                            className={cx('reply-content')}
                                            onClick={() =>
                                                handleShowFrameComment({ id: item.id, name: item.user.displayName })
                                            }
                                        >
                                            Trả lời
                                        </div>
                                    )}
                                    <div className={cx('reply-date')}>{formatDate(new Date(item.createDate))}</div>
                                </div>
                            </div>
                        </div>
                        {item.feedbacks &&
                            item.feedbacks.map((feedback) => (
                                <div className={cx('frame-reply-comment')} key={feedback.id}>
                                    <div className={cx('comment-item')}>
                                        <div className={cx('avatar')}>
                                            <img src={feedback.user.avatarUrl} alt={feedback.user.displayName} />
                                        </div>
                                        <div className={cx('user-info')}>
                                            <div className={cx('displayname')}>{feedback.user.displayName}</div>
                                            <div className={cx('content')}>{feedback.content}</div>
                                            <div className={cx('reply')}>
                                                {isLoggedIn() && (
                                                    <div
                                                        className={cx('reply-content')}
                                                        onClick={() =>
                                                            handleShowFrameComment({
                                                                id: item.id,
                                                                name: feedback.user.displayName,
                                                            })
                                                        }
                                                    >
                                                        Trả lời
                                                    </div>
                                                )}
                                                <div className={cx('reply-date')}>
                                                    {formatDate(new Date(feedback.createDate))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        {isShowFrameComment && commentId === item.id && (
                            <div className={cx('toggle-frame-comment')}>
                                <div className={cx('comment-input')}>
                                    <textarea
                                        className={cx('comment-content')}
                                        placeholder="Nhập bình luận của bạn tại đây"
                                        rows={3}
                                        ref={replyRef}
                                        maxLength={5000}
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx('comment-btn')}>
                                    <Button primary onClick={handlePostReply}>
                                        Gửi
                                    </Button>
                                </div>
                            </div>
                        )}
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
