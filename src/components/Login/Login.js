import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false });

    const handleLogin = () => {
        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }
        setError('');
        navigate('/table');
    };

    const handleBlur = (field) => (e) => {
        setTouched({ ...touched, [field]: true });
        if (!e.target.value) {
            setError('Both fields are required.');
        } else {
            setError('');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title text-center">Login</h3>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    className={`form-control ${touched.username && !username ? 'is-invalid' : ''}`}
                                    id="username"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={handleBlur('username')}
                                    onFocus={() => setTouched({ ...touched, username: true })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    className={`form-control ${touched.password && !password ? 'is-invalid' : ''}`}
                                    id="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={handleBlur('password')}
                                    onFocus={() => setTouched({ ...touched, password: true })}
                                />
                            </div>
                            {(touched.username && !username || touched.password && !password) && (
                                <p className="text-danger">{error}</p>
                            )}
                            <div className={styles['button-container']}>
                                <button
                                    className={`btn btn-primary btn-block ${styles['btn-primary']}`}
                                    onClick={handleLogin}
                                    disabled={!username || !password}
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
