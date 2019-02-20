import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from '../../actions/articleActions';

class CommentItem extends Component {
    onDeleteClick(articleId, commentId) {
        this.props.deleteComment(articleId, commentId);
    }

    render() {
        const { comment, articleId, auth } = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img
                                className="rounded-circle d-none d-md-block small"
                                src={comment.avatar}
                                alt=""
                            />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {comment.user === auth.user.id ? (
                            <button
                                onClick={this.onDeleteClick.bind(this, articleId, comment._id)}
                                type="button"
                                className="btn btn-danger mr-1 align-bottom-right"
                            >
                                <i className="fas fa-trash" />
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    articleId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
