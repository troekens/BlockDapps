import {
    ADD_ARTICLE,
    GET_ARTICLES,
    GET_ARTICLE,
    DELETE_ARTICLE,
    ARTICLE_LOADING
} from '../actions/types';

const initialState = {
    articles: [],
    article: {},
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ARTICLE_LOADING:
            return {
                ...state,
                loading: true
            };
        case GET_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            };
        case GET_ARTICLE:
            return {
                ...state,
                article: action.payload,
                loading: false
            };
        case ADD_ARTICLE:
            return {
                ...state,
                articles: [action.payload, ...state.articles]
            };
        case DELETE_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.payload)
            };
        default:
            return state;
    }
}
