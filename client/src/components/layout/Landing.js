import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';

import logo from '../../img/profile.png';

class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <header className="masthead bg-primary text-white text-center">
                <div className="container">
                    <img className="img-fluid mb-5 d-block mx-auto" src={logo} alt={""}/>
                    <h1 className=" text-uppercase mb-0">Start on BlockDapps</h1>
                    <hr className="star-light"/>
                    <h2 className=" font-weight-light mb-0">Smart Contract Developers - Dapps rating</h2>
                    <hr/>
                    <Link to="/register" className="btn btn-lg btn-secondary mr-2">
                        Sign Up
                    </Link>
                    <Link to="/login" className="btn btn-lg btn-light">
                        Login
                    </Link>
                </div>
            </header>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);
