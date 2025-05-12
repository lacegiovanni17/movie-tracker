import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <i className="bi bi-film me-2"></i>
                    <span>Movie Tracker</span>
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/"
                                end
                            >
                                <i className="bi bi-house-door me-1"></i>Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                className={({ isActive }) =>
                                    isActive ? "nav-link active" : "nav-link"
                                }
                                to="/add"
                            >
                                <i className="bi bi-plus-circle me-1"></i>Add Movie
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;