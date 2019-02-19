import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArticleItem from './ArticleItem';

class ArticleFeed extends Component {
    render() {
        const { articles } = this.props;

        return articles.map(article => <ArticleItem key={article._id} article={article} />);
    }
}

ArticleFeed.propTypes = {
    articles: PropTypes.array.isRequired
};

export default ArticleFeed;

