import React, { useState } from 'react';
import {useHistory} from 'react-router';
import axios from 'axios';
import Loader from './loader';
import auth from '../auth';

const Login = (props) => {
    const history = useHistory()
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
     
    const handleSubmit = event => {
       event.preventDefault();
       auth.login();
       setLoading(true);
        const userData = {
            email,
            password
        }
        axios.post('/users/login', userData)
        .then((res)=> {
            localStorage.setItem('userToken', res.data.name);
            history.push(`/exercises`);
            setLoading(false);
        })  
        .catch((err) => {
            setError(err.response.data.error);
            setLoading(false)
        })
    }
    const onChangeEmail = e => {
        setEmail(e.target.value)
        setError('')
    }
    const onChangePassword = e => {
        setPassword(e.target.value)
        setError('')
    }
    return (
        <div className="container">
            {
                (loading) ? (<Loader />) : (
              
                <form onSubmit={handleSubmit} className="form-wrapper">
                {error && <div class="alert alert-danger" role="alert">
                            <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span class="sr-only">Error:</span>
                                Enter a valid email address and password
                            </div>
                }
                
                <div className="form-group">
                    <label for="inputEmail3" className="col-xs-12 col-sm-3">Email</label>
                    <div className="col-xs-12 col-sm-9 input-wrapper">
                        <input type="email" className="form-control" id="inputEmail3" onChange={onChangeEmail}/>
                    </div>
                </div>
                <div class="form-group">
                    <label for="inputPassword3" className="col-xs-12 col-sm-3">Password</label>
                    <div className="col-xs-12 col-sm-9 input-wrapper">
                        <input type="password" className="form-control" id="inputPassword3" onChange={onChangePassword}/>
                    </div>
                </div> 
                <div class="form-group">
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-primary" >Sign in</button>
                    </div>
                </div>
            </form>)}
            
        </div>
    )
}

export default Login;