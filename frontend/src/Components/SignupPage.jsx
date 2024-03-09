import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks';
import routes from '../hooks/routes';

const SignupPage = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required').min(3, 'Username legth limit min 3').max(20, 'Username legth limit max 20'),
            password: Yup.string().required('Password is required').min(6, 'Password legth limit min 6'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
        }),
        onSubmit: async (values) => {
            try {
                const response = await axios.post(routes.signup(), values);
                login(response.data.token);
                // Перенаправление на другую страницу после успешной регистрации
            } catch (error) {
                setError(error.response.data.message);
            }
        }
    });

    return (
        <div className="container-fluid h-100">
            <div className="row justify-content-center align-content-center h-100">
                <div className="col-12 col-md-8 col-xxl-6">
                    <div className="card shadow-sm">
                        <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                            <div>
                                <img
                                    src="./signupPage.jpg"
                                    alt="Регистрация"
                                />
                            </div>
                            <Form onSubmit={formik.handleSubmit} className="w-50">
                                <h1 className="text-center mb-4">Регистрация</h1>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control
                                        type="text"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.username}
                                        placeholder="Username"
                                        name="username"
                                        id="username"
                                        autoComplete="new-username"
                                        required
                                        isInvalid={formik.errors.username && formik.touched.username}
                                    />
                                    <Form.Label htmlFor="username">Имя пользователя</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.username}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        placeholder="Password"
                                        name="password"
                                        id="password"
                                        autoComplete="new-password"
                                        isInvalid={formik.errors.password && formik.touched.password}
                                        required
                                    />
                                    <Form.Label htmlFor="password">Пароль</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="form-floating mb-3">
                                    <Form.Control
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.confirmPassword}
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        autoComplete="new-password"
                                        isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                                        required
                                    />
                                    <Form.Label htmlFor="confirmPassword">Подтвердите пароль</Form.Label>
                                    <Form.Control.Feedback type="invalid" tooltip>
                                        {formik.errors.confirmPassword}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Button type="submit" variant="outline-primary" className="w-100">Регистрация</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;