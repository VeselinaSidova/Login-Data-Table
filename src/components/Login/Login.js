import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, FormGroup, FormControl, Button, Container, Row, Col, Card } from 'react-bootstrap';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [touched, setTouched] = useState({ username: false, password: false });

    const handleLogin = (e) => {
        e.preventDefault();
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
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={4}>
                    <Card>
                        <Card.Body>
                            <h3 className="text-center mb-4">Login</h3>
                            <Form onSubmit={handleLogin}>
                                <FormGroup>
                                    <Form.Label htmlFor="username">Username</Form.Label>
                                    <FormControl
                                        type="text"
                                        className={`form-control ${touched.username && !username ? 'is-invalid' : ''}`}
                                        id="username"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onBlur={handleBlur('username')}
                                        onFocus={() => setTouched({ ...touched, username: true })}
                                    />
                                </FormGroup>
                                <FormGroup className='mt-2'>
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    <FormControl
                                        type="password"
                                        className={`form-control ${touched.password && !password ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onBlur={handleBlur('password')}
                                        onFocus={() => setTouched({ ...touched, password: true })}
                                    />
                                </FormGroup>
                                {((touched.username && !username) || (touched.password && !password)) && (
                                    <p className="text-danger">{error}</p>
                                )}
                                <div className={styles['button-container']}>
                                    <Button
                                        type="submit"
                                        className={`btn btn-primary btn-block ${styles['btn-primary']}`}
                                        disabled={!username || !password}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
