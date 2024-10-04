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
import { getUserName, getUserRole, isLoggedIn } from '~/services/authServices';
import AuthModals from '~/components/AuthModals';
import { faChevronDown, faPen, faRemove } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Comment = ({ filmId }) => {
    const [comments, setComments] = useState([]);
    // const [feedbacks, setFeedbacks] = useState([]);
    const [commentId, setCommentId] = useState('');
    const [feedbackId, setFeedbackId] = useState('');
    const [commentUpdateId, setCommentUpdateId] = useState('');
    const [feedbackUpdateId, setFeedbackUpdateId] = useState('');
    const [commentContent, setCommentContent] = useState('');
    const [replyContent, setReplyContent] = useState('');
    const [commentUpdateContent, setCommentUpdateContent] = useState('');
    const [replyUpdateContent, setReplyUpdateContent] = useState('');
    const [visibleComments, setVisibleComments] = useState(4);
    const [isShowAuthModal, setIsShowAuthModal] = useState(false);
    const [isShowFrameComment, setIsShowFrameComment] = useState(false);
    const [isShowOptionComment, setIsShowOptionComment] = useState(false);
    const [isShowFrameCommentUpdate, setIsShowFrameCommentUpdate] = useState(false);
    const replyRef = useRef(null);
    const commentRef = useRef({});
    const feedbackRef = useRef(null);
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
        if (replyRef.current) {
            replyRef.current.focus();
        }
    };
    const handleShowOption = (data = {}) => {
        setIsShowOptionComment(!isShowOptionComment);
        setCommentId(data.commentId);
        setFeedbackId(data.feedbackId);
    };

    const handleShowFrameCommentUpdate = (data = {}) => {
        setIsShowFrameCommentUpdate(true);
        setIsShowOptionComment(false);
        setCommentUpdateId(data.commentId);
        setFeedbackUpdateId(data.feedbackId);
        if (data.commentId) {
            if (commentRef.current) {
                const item = document.getElementById('comment_' + data.commentId);
                console.log(item.querySelector('.contentComment'));
                item.style.display = 'none';
            }
            setCommentUpdateContent(data.commentContent);
        }
        if (data.feedbackId) {
            if (feedbackRef.current) {
                const item = document.getElementById('feedback_' + data.feedbackId);
                item.style.display = 'none';
            }
            setReplyUpdateContent(data.feedbackContent);
        }
    };
    const handleCancelCommentUpdate = (data = {}) => {
        setIsShowFrameCommentUpdate(false);
        if (data.commentId) {
            if (commentRef.current) {
                const item = document.getElementById('comment_' + data.commentId);
                item.style.display = '';
            }
        }
        if (data.feedbackId) {
            if (feedbackRef.current) {
                const item = document.getElementById('feedback_' + data.feedbackId);
                item.style.display = '';
            }
        }
    };

    const handleDeleteComment = async (data = {}) => {
        if (data.commentId) {
            const response = await commentServices.del(data.commentId);
            if (response && response.success) {
                const item = document.getElementById('comment_' + data.commentId);
                item.style.display = 'none';
                toast.success(response.message);
            }
        }
        if (data.feedbackId) {
            const response = await feedbackServices.del(data.feedbackId);
            if (response && response.success) {
                const item = document.getElementById('feedback_' + data.feedbackId);
                item.style.display = 'none';
                toast.success(response.message);
            }
        }
    };

    const handleUpdateComment = async (data = {}) => {
        if (data.commentId) {
            const response = await commentServices.update({ id: data.commentId, content: commentUpdateContent });
            if (response && response.success) {
                const item = document.getElementById('comment_' + data.commentId);
                const content = item.querySelector('.content-comment-' + data.commentId);
                item.style.display = '';
                setIsShowFrameCommentUpdate(false);
                content.innerHTML = commentUpdateContent;
                toast.success(response.message);
            }
        }
        if (data.feedbackId) {
            const response = await feedbackServices.update({ id: data.feedbackId, content: replyUpdateContent });
            if (response && response.success) {
                const item = document.getElementById('feedback_' + data.feedbackId);
                const content = item.querySelector('.content-feedback-' + data.feedbackId);
                item.style.display = '';
                setIsShowFrameCommentUpdate(false);
                content.innerHTML = replyUpdateContent;
                toast.success(response.message);
            }
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
            <div className={cx('comments-list')} ref={commentRef}>
                {comments.slice(0, visibleComments).map((item) => (
                    <div key={item.id} className={cx('frame-comment')}>
                        {isShowFrameCommentUpdate && commentUpdateId === item.id && (
                            <div className={cx('toggle-frame-comment-update')}>
                                <div className={cx('comment-input')}>
                                    <textarea
                                        className={cx('comment-content')}
                                        placeholder="Nhập bình luận của bạn tại đây"
                                        rows={3}
                                        maxLength={5000}
                                        value={commentUpdateContent}
                                        onChange={(e) => setCommentUpdateContent(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className={cx('comment-btn')}>
                                    <Button
                                        cancel
                                        onClick={() =>
                                            handleCancelCommentUpdate({
                                                commentId: item.id,
                                                feedbackId: '',
                                            })
                                        }
                                    >
                                        Hủy
                                    </Button>
                                    <Button
                                        primary
                                        onClick={() => handleUpdateComment({ commentId: item.id, feedbackId: '' })}
                                    >
                                        Lưu
                                    </Button>
                                </div>
                            </div>
                        )}
                        <div className={cx('comment-item')} id={'comment_' + item.id}>
                            <div className={cx('avatar')}>
                                <img src={item.user.avatarUrl} alt={item.user.displayName} />
                            </div>
                            <div className={cx('user-info')}>
                                <div className={cx('user-info-header')}>
                                    <div className={cx('displayname')}>{item.user.displayName}</div>
                                    {getUserName() === item.user.userName && (
                                        <div className={cx('options-icon')}>
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                onClick={() =>
                                                    handleShowOption({
                                                        commentId: item.id,
                                                        feedbackId: '',
                                                    })
                                                }
                                            />
                                            {isShowOptionComment && commentId === item.id && (
                                                <div className={cx('options')}>
                                                    <div
                                                        className={cx('option-update')}
                                                        onClick={() =>
                                                            handleShowFrameCommentUpdate({
                                                                commentId: item.id,
                                                                commentContent: item.content,
                                                                feedbackId: '',
                                                                feedbackContent: '',
                                                            })
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faPen} />
                                                        <span>Sửa</span>
                                                    </div>
                                                    <div
                                                        className={cx('option-delete')}
                                                        onClick={() => {
                                                            handleDeleteComment({ commentId: item.id, feedbackId: '' });
                                                        }}
                                                    >
                                                        <FontAwesomeIcon icon={faRemove} />
                                                        <span>Xóa</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className={cx('content', 'content-comment-' + item.id)}>{item.content}</div>
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
                        <div className={cx('feedbacks-list')} ref={feedbackRef}>
                            {item.feedbacks &&
                                item.feedbacks.map((feedback) => (
                                    <div className={cx('frame-reply-comment')} key={feedback.id}>
                                        {isShowFrameCommentUpdate && feedbackUpdateId === feedback.id && (
                                            <div className={cx('toggle-frame-comment-update')}>
                                                <div className={cx('comment-input')}>
                                                    <textarea
                                                        className={cx('comment-content')}
                                                        placeholder="Nhập bình luận của bạn tại đây"
                                                        rows={3}
                                                        maxLength={5000}
                                                        value={replyUpdateContent}
                                                        onChange={(e) => setReplyUpdateContent(e.target.value)}
                                                    ></textarea>
                                                </div>
                                                <div className={cx('comment-btn')}>
                                                    <Button
                                                        cancel
                                                        onClick={() =>
                                                            handleCancelCommentUpdate({
                                                                commentId: '',
                                                                feedbackId: feedback.id,
                                                            })
                                                        }
                                                    >
                                                        Hủy
                                                    </Button>
                                                    <Button
                                                        primary
                                                        onClick={() =>
                                                            handleUpdateComment({
                                                                commentId: '',
                                                                feedbackId: feedbackId,
                                                            })
                                                        }
                                                    >
                                                        Lưu
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                        <div className={cx('comment-item')} id={'feedback_' + feedback.id}>
                                            <div className={cx('avatar')}>
                                                <img src={feedback.user.avatarUrl} alt={feedback.user.displayName} />
                                            </div>
                                            <div className={cx('user-info')}>
                                                <div className={cx('user-info-header')}>
                                                    <div className={cx('displayname')}>{feedback.user.displayName}</div>
                                                    {getUserName() === feedback.user.userName && (
                                                        <div className={cx('options-icon')}>
                                                            <FontAwesomeIcon
                                                                icon={faChevronDown}
                                                                onClick={() =>
                                                                    handleShowOption({
                                                                        commentId: '',
                                                                        feedbackId: feedback.id,
                                                                    })
                                                                }
                                                            />
                                                            {isShowOptionComment && feedbackId === feedback.id && (
                                                                <div className={cx('options')}>
                                                                    <div
                                                                        className={cx('option-update')}
                                                                        onClick={() =>
                                                                            handleShowFrameCommentUpdate({
                                                                                commentId: '',
                                                                                commentContent: '',
                                                                                feedbackId: feedback.id,
                                                                                feedbackContent: feedback.content,
                                                                            })
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon icon={faPen} />
                                                                        <span>Sửa</span>
                                                                    </div>
                                                                    <div
                                                                        className={cx('option-delete')}
                                                                        onClick={() => {
                                                                            handleDeleteComment({
                                                                                commentId: '',
                                                                                feedbackId: feedback.id,
                                                                            });
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon icon={faRemove} />
                                                                        <span>Xóa</span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                                <div className={cx('content', 'content-feedback-' + feedback.id)}>
                                                    {feedback.content}
                                                </div>
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
                        </div>
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
