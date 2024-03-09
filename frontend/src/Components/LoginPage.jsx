import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../hooks';
import routes from '../hooks/routes';
import { useTranslation } from 'react-i18next';

const schema = Yup.object().shape({
  username: Yup.string().required('Required field'),
  password: Yup.string().required('Required field'),
});

const LoginPage = () => {
  const { t } = useTranslation();
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
                  <h1 className="text-center mb-4">{t('login.header')}</h1>
                  <Form.Group>
                    <FloatingLabel
                      id="floatingUsername"
                      label={t('login.username')}
                      className="mb-3"
                    >
                      <Form.Control
                        id="username"
                        name="username"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        type="text"
                        placeholder={t('login.username')}
                        isInvalid={authFalied}
                        ref={inputRef}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group>
                    <FloatingLabel
                      id="floationgPassword"
                      label={t('login.password')}
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
                  <Form.Control.Feedback type="invalid" tooltip>{t('login.authFailed')}</Form.Control.Feedback>
                  <Button variant="primary" type="submit">{t('login.submit')}</Button>
                </Form>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                <span>{t('login.notAUser')}</span>
                  {' '}
                  <a href="/signup">{t('login.signup')}</a>
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
