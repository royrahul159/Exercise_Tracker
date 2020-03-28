import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';
import auth from '../auth';

const Navbar = () => {
    
    const history = useHistory();

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('userToken');
        auth.logout();
        history.push('/');
    }
 
    const exerciseLog = (
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
                <li className="navbar-item"> 
                    <Link to="/exercises" className="nav-link">Exercises</Link>
                </li>
                <li className="navbar-item">    
                    <Link to="/exercises/create" className="nav-link">Create Exercise Log</Link>
                </li>
            </ul>
            <ul className="navbar-nav">
                <li className="navbar-item">
                    <Link href="" className="nav-link" to="/logout" onClick={logout} >Logout</Link>
                </li>
            </ul>
        </div>
    )
    return (
        <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to="/" className="navbar-brand">Excercise Tracker</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            { localStorage.getItem('userToken') ? (exerciseLog) : null }
            
        </nav>
    )
}

export default Navbar;