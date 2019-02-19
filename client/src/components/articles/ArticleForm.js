import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {addArticle} from '../../actions/articleActions';

class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
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
            name: user.name,
            avatar: user.avatar
        };

        this.props.addArticle(newArticle);
        this.setState({text: ''});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const {errors, displayFormArticle} = this.state;

        let articleForm;

        if (displayFormArticle) {
            articleForm = (<div className="post-form mb-3">
                    <h2 className="text-center text-uppercase text-secondary mb-0">Articles Feed</h2>
                    <hr className="star-dark mb-5"/>
                    <div className="card card-info">
                        <div className="card-header bg-primary text-white">Start an article...</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextAreaFieldGroup
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

        return (
            <div className="post-form mb-3">
                {articleForm}
                <button
                    type="button"
                    onClick={() => {
                        this.setState(prevState => ({
                            displayFormArticle: !prevState.displayFormArticle
                        }));
                    }}
                    className="btn btn-light"
                >
                    Write an article
                </button>

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
