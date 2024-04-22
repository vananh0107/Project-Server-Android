import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../app/features/auth/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import * as yup from 'yup';
import { ToastContainer } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginSchema = yup.object({
    email: yup
      .string()
      .email('Email should be valid')
      .required('Email address is required'),
    password: yup.string().required('Password is required'),
  });
  const user = useSelector((state) => state.auth?.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(loginUser(values));
    },
  });
  if (user) {
    setTimeout(() => {
      navigate('/admin');
    }, 1000);
  }
  return (
    <div
      className="py-5"
      style={{
        backgroundImage:
          'url("https://jooinn.com/images/fruits-background-3.jpg")',
        minHeight: '100vh',
        backgroundSize: 'cover'
      }}
    >
      <div
        className="w-25  rounded-3 mx-auto p-3"
        style={{ border: '1px solid #09d5e5' ,marginTop: '60px' }}
      >
        <h6 className="text-center">Login</h6>
        <p className="text-center">Login to your account to continue</p>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email address"
            id="email"
            onCh={formik.handleChange('email')}
            onBl={formik.handleBlur('email')}
            val={formik.values.email}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="password"
            onCh={formik.handleChange('password')}
            onBl={formik.handleBlur('password')}
            val={formik.values.password}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password">Forgot Password?</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-6"
            style={{ background: '#09d5e5' }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
      />
    </div>
  );
};

export default Login;
