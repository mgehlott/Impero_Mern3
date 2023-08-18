import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Container, Form, Button } from 'react-bootstrap';
import InputError from '../utils/InputError';
import { useLocation, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { showToast } from '../../utils/tool';
import { useSelector } from 'react-redux';
const URL = 'http://localhost:8080';
const AddEmployee = () => {
  const [companies, setCompanies] = useState([]);
  const { state } = useLocation();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const eighteen_year_ago = dayjs().subtract(18, 'year').format('YYYY-MM-DD');
  const joinDate = state?.joiningDate
    ? dayjs(state?.joiningDate).format('YYYY-MM-DD')
    : '';
  const bDate = state?.birthDate
    ? dayjs(state?.birthDate).format('YYYY-MM-DD')
    : '';
  const rDate = state?.resignationDate
    ? dayjs(state?.resignationDate).format('YYYY-MM-DD')
    : '';
  console.log(joinDate, bDate, rDate, state?.company);
  const formik = useFormik({
    initialValues: {
      company: state?.company.companyId || '',
      name: state?.name || '',
      email: state?.email || '',
      birthdate: bDate || '',
      joiningdate: joinDate || '',
      resignationdate: rDate || '',
      salary: state?.salary || '',
    },
    validationSchema: Yup.object({
      company: Yup.string().required('Company name is required'),
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      birthdate: Yup.date()
        .max(eighteen_year_ago, 'Age must be greater than 18 years')
        .required('BirthDate is required'),
      joiningdate: Yup.date()
        .min(
          Yup.ref('birthdate'),
          'Joining date must be greater than birth date'
        )
        .required('Joining Date is required'),
      resignationdate: Yup.date()
        .min(
          Yup.ref('joiningdate'),
          'Resiganation date must be greater than joining date'
        )
        .notRequired(),
      salary: Yup.number('Must be a number').required('Salary is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addEmployee(values);
    },
  });
  const fetchCompanies = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { data } = await axios.get(`${URL}/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      data.unshift({ _id: '1', name: '' });
      setCompanies(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log('company');
    (async () => {
      await fetchCompanies();
    })();
  }, []);
  const addEmployee = async (values) => {
    console.log(values.company);
    const companyName = companies.find((item) => item._id === values.company);
    console.log(companyName);
    let fullUrl = URL;
    let method, data;
    if (state) {
      fullUrl += `/employee/edit/${state._id}`;
      method = 'put';
      data = {
        ...values,
        company: {
          companyId: values.company,
          name: companyName.name,
        },
      };
      console.log('edit');
    } else {
      fullUrl += '/employee/add';
      method = 'post';
      data = { ...values };
      console.log('add');
    }
    console.log('data', data);
    try {
      const { status, ...restResult } = await axios(fullUrl, {
        method: method,
        data,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        showToast('SUCCESS', 'Employee Saved !!');
        navigate('/employees');
      }
      console.log(restResult);
    } catch (error) {
      showToast('ERROR', 'Try Again Later !!');
    }
  };
  const cancelHandler = () => {
    navigate('/employees', { replace: true });
  };
  return (
    <Container>
      <div className="header">
        <h4>Add / Edit Employee</h4>
      </div>
      <Form
        className="mb-5"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group
          className="mb-2"
          controlId="formGroupCompany"
        >
          <Form.Label>Select Company</Form.Label>
          <Form.Select
            className="simple-select"
            {...formik.getFieldProps('company')}
            // {state?.company_id && defaultChecked={com}
          >
            {companies.map((company) => {
              return (
                <option
                  key={company._id}
                  value={company._id}
                >
                  {company.name}
                </option>
              );
            })}
          </Form.Select>
          {formik.errors.company && formik.touched.company && (
            <InputError>{formik.errors.company}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGroupName"
        >
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            {...formik.getFieldProps('name')}
          />
          {formik.errors.name && formik.touched.name && (
            <InputError>{formik.errors.name}</InputError>
          )}
        </Form.Group>
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
          controlId="formGroupBirthDate"
        >
          <Form.Label>BirthDate </Form.Label>
          <Form.Control
            type="date"
            {...formik.getFieldProps('birthdate')}
          />
          {formik.errors.birthdate && formik.touched.birthdate && (
            <InputError>{formik.errors.birthdate}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGroupJoinDate"
        >
          <Form.Label>Joining Date </Form.Label>
          <Form.Control
            type="date"
            {...formik.getFieldProps('joiningdate')}
          />
          {formik.errors.joiningdate && formik.touched.joiningdate && (
            <InputError>{formik.errors.joiningdate}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGroupResignationDate"
        >
          <Form.Label>Resignation Date </Form.Label>
          <Form.Control
            type="date"
            {...formik.getFieldProps('resignationdate')}
          />
          {formik.errors.resignationdate && formik.touched.resignationdate && (
            <InputError>{formik.errors.resignationdate}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGroupSalary"
        >
          <Form.Label>Salary</Form.Label>
          <Form.Control
            type="number"
            placeholder="Salary"
            {...formik.getFieldProps('salary')}
          />
          {formik.errors.salary && formik.touched.salary && (
            <InputError>{formik.errors.salary}</InputError>
          )}
        </Form.Group>
        <div>
          <Button
            variant="success"
            type="submit"
            className="m-2"
          >
            Save
          </Button>
          <Button
            variant="danger"
            onClick={cancelHandler}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default AddEmployee;
