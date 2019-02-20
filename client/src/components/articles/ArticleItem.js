import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import {deleteArticle, addLike, removeLike} from '../../actions/articleActions';

class ArticleItem extends Component {
    onDeleteClick(id) {
        this.props.deleteArticle(id);
    }

    onLikeClick(id) {
        this.props.addLike(id);
    }

    onUnlikeClick(id) {
        this.props.removeLike(id);
    }

    findUserLike(likes) {
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const {article, auth, showActions} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                            <img
                                className="small rounded-circle d-none d-md-block"
                                src={article.avatar}
                                alt=""
                            />
                        </a>
                        <br/>
                        <p className="text-center">{article.name}</p>
                    </div>
                    <div className="col-md-10">
                        <pre className="lead"><h3 className="text-secondary mb-0">{article.title}</h3></pre>
                        <pre className="lead">{article.text}</pre>
                        {showActions ? (
                            <span className="align-bottom">
                                            <button
                                                onClick={this.onLikeClick.bind(this, article._id)}
                                                type="button"
                                                className="btn btn-light mr-1"
                                            >
                                              <i
                                                  className={classnames('fas fa-thumbs-up', {
                                                      'text-info': this.findUserLike(article.likes)
                                                  })}
                                              />
                                            <span className="badge badge-light">{article.likes.length}</span>
                                            </button>
                                            <button
                                                onClick={this.onUnlikeClick.bind(this, article._id)}
                                                type="button"
                                                className="btn btn-light mr-1"
                                            >
                                          <i className="text-secondary fas fa-thumbs-down"/>
                                            </button>
                                            <Link to={`/article/${article._id}`} className="btn btn-info mr-1">
                                              Comments ({article.comments.length})
                                            </Link>
                                {article.user === auth.user.id ? (
                                    <button
                                        onClick={this.onDeleteClick.bind(this, article._id)}
                                        type="button"
                                        className="btn btn-danger mr-1"
                                    >
                                        <i className="fas fa-trash" />
                                    </button>
                                ) : null}
                                    </span>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }
}

ArticleItem.defaultProps = {
    showActions: true
};

ArticleItem.propTypes = {
    deleteArticle: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deleteArticle, addLike, removeLike})(
    ArticleItem
);
