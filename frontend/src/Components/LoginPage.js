import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  nickname: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
});

const LoginPage = () => (
  <div>
    <h1>Login</h1>
    <Formik
      initialValues={{
        userName: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={ (values) => {
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="userName" />
          {errors.userName && touched.userName ? (
            <div>{errors.userName}</div>
          ) : null}
          <Field name="password" />
          {errors.password && touched.password ? (
            <div>{errors.password}</div>
          ) : null}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

export default LoginPage;
