import axios from 'axios';

import {
    ADD_ARTICLE,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_ARTICLES,
    GET_ARTICLE,
    ARTICLE_LOADING,
    DELETE_ARTICLE
} from './types';

// Add Article
export const addArticle = articleData => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/api/articles', articleData)
        .then(res =>
            dispatch({
                type: ADD_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get Articles
export const getArticles = () => dispatch => {
    dispatch(setArticleLoading());
    axios
        .get('/api/articles')
        .then(res =>
            dispatch({
                type: GET_ARTICLES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ARTICLES,
                payload: null
            })
        );
};

// Get Article
export const getArticle = id => dispatch => {
    dispatch(setArticleLoading());
    axios
        .get(`/api/articles/${id}`)
        .then(res =>
            dispatch({
                type: GET_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ARTICLE,
                payload: null
            })
        );
};

// Delete Article
export const deleteArticle = id => dispatch => {
    axios
        .delete(`/api/articles/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_ARTICLE,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Like
export const addLike = id => dispatch => {
    axios
        .post(`/api/articles/like/${id}`)
        .then(res => dispatch(getArticles()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Like
export const removeLike = id => dispatch => {
    axios
        .post(`/api/articles/unlike/${id}`)
        .then(res => dispatch(getArticles()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Comment
export const addComment = (articleId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/articles/comment/${articleId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Delete Comment
export const deleteComment = (articleId, commentId) => dispatch => {
    axios
        .delete(`/api/articles/comment/${articleId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Set loading state
export const setArticleLoading = () => {
    return {
    type: ARTICLE_LOADING
    };
};

// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
