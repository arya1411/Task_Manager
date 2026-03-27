import React, { useState, useContext } from 'react';
import { LuSend, LuMessageSquare } from 'react-icons/lu';
import moment from 'moment';
import axiosInstance from '../utils/axiosInstance';
import { API_PATH } from '../utils/apiPath';
import { UserContext } from '../context/userContenxt';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const TaskComments = ({ taskId, comments: initialComments = [], onCommentAdded }) => {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) return;

    setLoading(true);
    try {
      const response = await axiosInstance.post(API_PATH.TASKS.ADD_COMMENT(taskId), {
        text: newComment.trim(),
      });

      if (response.data?.comment) {
        setComments(prev => [...prev, response.data.comment]);
        setNewComment("");
        showSuccessToast("Comment added!");
        if (onCommentAdded) onCommentAdded(response.data.comment);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      showErrorToast(error.response?.data?.message || "Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-100 dark:border-dark-border">
      <div className="flex items-center gap-2 mb-4">
        <LuMessageSquare className="text-gray-500 dark:text-dark-text-secondary" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-text">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <LuMessageSquare className="w-10 h-10 text-gray-300 dark:text-dark-text-secondary mx-auto mb-2" />
            <p className="text-gray-400 dark:text-dark-text-secondary text-sm">
              No comments yet. Be the first to comment!
            </p>
          </div>
        ) : (
          comments.map((comment, index) => (
            <div
              key={comment._id || index}
              className="flex gap-3 p-3 rounded-lg bg-gray-50 dark:bg-dark-surface-2"
            >
              {/* User Avatar */}
              {comment.user?.profileImageUrl ? (
                <img
                  src={comment.user.profileImageUrl}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-medium text-purple-600">
                    {comment.user?.name?.charAt(0)?.toUpperCase() || "?"}
                  </span>
                </div>
              )}

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900 dark:text-dark-text">
                    {comment.user?.name || "Unknown User"}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-dark-text-secondary">
                    {comment.createdAt ? moment(comment.createdAt).fromNow() : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-dark-text-secondary break-words">
                  {comment.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full px-4 py-2.5 pr-12 rounded-lg border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-surface-2 text-gray-900 dark:text-dark-text focus:border-primary focus:ring-1 focus:ring-primary outline-none transition text-sm placeholder:text-gray-400 dark:placeholder:text-dark-text-secondary"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          disabled={loading || !newComment.trim()}
          className="px-4 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <LuSend className="text-sm" />
          <span className="text-sm font-medium hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};

export default TaskComments;
