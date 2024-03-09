import React, { useState, useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAuth } from '../hooks/index.jsx';
import routes from '../routes.js';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignupPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const [isSubmitting, setSubmitting] = useState(false);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .min(3, 'signup.lengthLimit')
        .max(20, 'signup.lengthLimit')
        .required('signup.required'),
      password: yup
        .string()
        .min(6, 'signup.passLengthLimit')
        .required('signup.required'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], t('signup.matches')),
    }),
    onSubmit: async (values) => {
      setSubmitting(false);
      try {
        const { data } = await axios.post(
          routes.signupApiPath(),
          { username: values.username, password: values.password },
        );
        auth.logIn(data);
        navigate(routes.chatPagePath());
      } catch (error) {
        if (error.response.status === 409) {
          setSubmitting(true);
          inputRef.current.select();
          return;
        }
        console.error(error.message);
      }
    },
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
                  alt="registration"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">{t('signup.header')}</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    placeholder={t('signup.lengthLimit')}
                    name="username"
                    id="username"
                    autoComplete="new-username"
                    required
                    isInvalid={formik.errors.username && formik.touched.username}
                    ref={inputRef}
                  />
                  <Form.Label htmlFor="username">{t('signup.username')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.username)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    placeholder={t('signup.passLengthLimit')}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                    isInvalid={formik.errors.password && formik.touched.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('signup.password')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {t(formik.errors.password)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    placeholder={t('signup.matches')}
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="new-password"
                    isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
                    required
                  />
                  <Form.Label htmlFor="confirmPassword">{t('signup.confirm')}</Form.Label>
                  <Form.Control.Feedback type="invalid" tooltip>
                    {isSubmitting
                      ? t('signup.notUniq')
                      : t(formik.errors.confirmPassword)}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100">{t('signup.submit')}</Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;