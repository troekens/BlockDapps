import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArticleFeed from './ArticleFeed';
import ArticleForm from './ArticleForm';
import Spinner from '../common/Spinner';
import { getArticles } from '../../actions/articleActions';

class Articles extends Component {

    componentDidMount() {
        this.props.getArticles();
    }

    render() {
        const { articles, loading } = this.props.article;
        console.log(articles);
        let articleContent;

        if (articles === null || loading) {
            articleContent = <Spinner />;
        } else {
            articleContent = <ArticleFeed articles={articles} />;
        }

        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <ArticleForm/>
                            <pre className="lead">{articleContent}</pre>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Articles.propTypes = {
    getArticles: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    article: state.article
});

export default connect(mapStateToProps, { getArticles })(Articles);
