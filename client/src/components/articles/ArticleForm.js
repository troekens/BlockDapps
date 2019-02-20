import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import {addArticle} from '../../actions/articleActions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            title:'',
            errors: {},
            displayFormArticle: false,
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({errors: newProps.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const {user} = this.props.auth;

        const newArticle = {
            text: this.state.text,
            title: this.state.title,
            name: user.name,
            avatar: user.avatar
        };

        this.props.addArticle(newArticle);
        this.setState({text: '', title: ''});
    }

    onChange(e) {
        //this.setState({[e.target.name]: e.target.value});
        this.setState({text:e});
    }

    render() {
        const {errors, displayFormArticle} = this.state;
        const {isAuthenticated, user} = this.props.auth;

        let articleForm;
        let isActive;
        let isNotActive;

        if (displayFormArticle) {
            articleForm = (<div className="post-form mb-3">
                    <div className="card card-info">
                        <div className="card-header bg-primary text-white">Start an article...</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextFieldGroup
                                        placeholder="Title..."
                                        name="title"
                                        value={this.state.title}
                                        onChange={e => {
                                            this.setState({title:e.target.value})}
                                        }
                                        error={errors.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <ReactQuill
                                        modules={ArticleForm.modules}
                                        formats={ArticleForm.formats}
                                        placeholder="Create an article"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        error={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-secondary">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                </div>

            );}

        ArticleForm.modules = {
            toolbar: [
                [{'header':'1'},{'header':'2'},{font:[]}],
                [{size:[]}],
                ['bold', 'italic','underline','strike','blockquote'],
                [{'list':'ordered'},{'list':'bullet'}],
                ['link','image','video'],
                ['clean'],
                ['code-block']
            ]
            };

        ArticleForm.formats = [
            'header','font','size','bold','italic','underline','strike','blockquote','list','bullet','link','image','video','code-block'
        ]

            if(displayFormArticle) {
            isActive = (<button
                    type="button"
                    onClick={() => {
                        this.setState(prevState => ({
                            displayFormArticle: !prevState.displayFormArticle
                        }));
                    }}
                    className="btn btn-primary"
                >
                    Close the form
                </button>
            );}

        if(!displayFormArticle) {
            isNotActive = (<button
                    type="button"
                    onClick={() => {
                        this.setState(prevState => ({
                            displayFormArticle: !prevState.displayFormArticle
                        }));
                    }}
                    className="btn btn-primary"
                >
                    Write an article
                </button>
            );}

        return (
            <div className="post-form mb-3">
                <h2 className="text-center text-uppercase text-secondary mb-0">Articles Feed</h2>
                <hr className="star-dark mb-5"/>
                {isAuthenticated ? isNotActive: null}
                {isAuthenticated ? articleForm : null}
                {isAuthenticated ? isActive: null}

            </div>

        );
    }
}

ArticleForm.propTypes = {
    addArticle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {addArticle})(ArticleForm);
