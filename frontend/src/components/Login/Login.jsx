import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../store/authSlice';
import * as Yup from 'yup';
import InputError from '../utils/InputError';
import { showToast } from '../../utils/tool';
import { Navigate } from 'react-router-dom';
const URL = 'http://localhost:8080/auth/login';
const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((statte) => statte.auth.user);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      loginUser(values);
    },
  });
  const loginUser = async (values) => {
    try {
      const result = await axios.post(
        URL,
        { ...values },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(result);
      if (result.status === 200) {
        console.log('logged in');
        showToast('SUCCESS', 'Login successfully !!');
        dispatch(login({ user: result.data.user,token : result.data.token }));
        localStorage.setItem('token', JSON.stringify(result.data.token));
        localStorage.setItem('user', JSON.stringify(result.data.user));
      }
    } catch (error) {
      console.log(error.response.data.message);
      showToast('ERROR', error.response.data.message);
    }
  };
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <Container>
      <Row>
        <div className="header">
          <h3>Admin Sign In</h3>
        </div>
      </Row>
      <Row className="center">
        <Col
          xs={10}
          sm={10}
          md={8}
          lg={5}
          className="m-auto"
        >
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="formGroupEmail"
            >
              <Form.Label>Email </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...formik.getFieldProps('email')}
              />
              {formik.errors.email && formik.touched.email && (
                <InputError>{formik.errors.email}</InputError>
              )}
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="formGroupPassword"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...formik.getFieldProps('password')}
              />
              {formik.errors.password && formik.touched.password && (
                <InputError>{formik.errors.password}</InputError>
              )}
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Login;
