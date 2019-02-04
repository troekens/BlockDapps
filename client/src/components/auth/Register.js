import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {registerUser} from '../../actions/authActions';
import Proptypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    onSubmit = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);
        /* axios.post('/api/users/register', newUser)
             .then(res => console.log(res.data))
             .catch(err => this.setState({errors: err.response.data}));*/
    }

    render() {
        const {errors} = this.state; //same as const errors = this.state.errors

        const {user} = this.props.auth;
        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h2 className="text-center text-uppercase text-secondary mb-0">Sign Up</h2>
                            <hr className="star-dark mb-5"/>
                            <form className="sentMessage" id="contactForm" noValidate onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                    error={errors.name}
                                />
                                <TextFieldGroup
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.onChange}
                                    error={errors.email}
                                    info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    error={errors.password}
                                />
                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.onChange}
                                    error={errors.password2}
                                />
                                <input type="submit" className="btn btn-primary btn-xl" id="register_button"/>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.proptypes = {
    registerUser: Proptypes.func.isRequired,
    auth: Proptypes.object.isRequired,
    errors: Proptypes.object.isRequired
}

const mapStateToProps = (state) => ({ //To be able to do this : this.props.auth.user or isauthenticated or whatever is in that state
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {registerUser})(withRouter(Register)); //withRouter is used to redirect after login/register/...
