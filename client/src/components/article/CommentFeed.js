import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

class CommentFeed extends Component {
    render() {
        const { comments, articleId } = this.props;

        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} articleId={articleId} />
        ));
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isRequired,
    articleId: PropTypes.string.isRequired
};

export default CommentFeed;
