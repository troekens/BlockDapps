import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authActions';
import {clearCurrentProfile} from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/feed">
                        Post Feed
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{width: '25px', marginRight: '5px'}}
                            title="You must have a Gravatar connected to your email to display an image"
                        />{' '}
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mx-0 mx-lg-1">
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                          to="/register">Sign
                        Up</Link>
                </li>
                <li className="nav-item mx-0 mx-lg-1">
                    <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                          to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-lg bg-secondary text-uppercase navbar-dark bg-dark mb-4" id="mainNav">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        BlockDapps
                    </Link>
                    <button
                        className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded"
                        type="button" data-toggle="collapse" data-target="#navbarResponsive"
                        aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                        <i className="fas fa-bars"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                                      to="/profiles">Developers</Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(
    Navbar
);
