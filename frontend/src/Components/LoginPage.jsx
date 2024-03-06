import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks';
import routes from '../hooks/routes';

const schema = Yup.object().shape({
  username: Yup.string().required('Required field'),
  password: Yup.string().required('Required field'),
});

const LoginPage = () => {
  const { logIn } = useAuth();
  const [authFalied, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: ({ username, password }) => {
      setAuthFailed(false);

      axios.post(routes.loginPath(), { username, password })
        .then(({ data }) => {
          logIn(data);
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            inputRef.current.select();
            return;
          }
          throw err;
        });
    },
  });

  return (
    <div className="d-flex flex-column h-100">
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src="./loginPage.jpg" className="rounded-circle" alt="Войти" />
                </div>
                <Form
                  onSubmit={formik.handleSubmit}
                  className="col-12 col-md-6 mt-3 mt-mb-0"
                >
                  <h1 className="text-center mb-4">Войти</h1>
                  <Form.Group>
                    <FloatingLabel
                      id="floatingUsername"
                      label="Ваш ник"
                      className="mb-3"
                    >
                      <Form.Control
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        type="text"
                        placeholder="username"
                        isInvalid={authFalied}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatingLabel
                      id="floationgPassword"
                      label="Пароль"
                      className="mb-4"
                    >
                      <Form.Control
                        id="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        type="password"
                        placeholder="password"
                        isInvalid={authFalied}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>
                  <Button variant="primary" type="submit">Войти</Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта? </span>
                  <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
