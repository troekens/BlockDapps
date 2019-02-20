import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleItem from '../articles/ArticleItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import Spinner from '../common/Spinner';
import { getArticle } from '../../actions/articleActions';

class Article extends Component {
    componentDidMount() {
        this.props.getArticle(this.props.match.params.id);
    }

    render() {
        const { article, loading } = this.props.article;
        let articleContent;

        if (article === null || loading || Object.keys(article).length === 0) {
            articleContent = <Spinner />;
        } else {
            articleContent = (
                <div>
                    <ArticleItem article={article} showActions={false} />
                    <CommentForm articleId={article._id} />
                    <CommentFeed articleId={article._id} comments={article.comments} />
                </div>
            );
        }

        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/articles" className="btn btn-light mb-3">
                                Back To Feed
                            </Link>
                            {articleContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Article.propTypes = {
    getArticle: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    article: state.article
});

export default connect(mapStateToProps, { getArticle })(Article);
