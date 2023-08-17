import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import InputError from '../utils/InputError';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { showToast } from '../../utils/tool';
import axios from 'axios';
import dayjs from 'dayjs';
const URL = 'http://localhost:8080';
const AddEvoluation = () => {
  const [employees, setEmployee] = useState([]);
  const navigate = useNavigate();
  const currentDate = dayjs().format('YYYY-MM');
  const formik = useFormik({
    initialValues: {
      name: '',
      percent: '',
      year: '',
      salary: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      percent: Yup.number().required('Percent is required'),
      year: Yup.date().required('Year is required'),
      salary: Yup.number('Must be a number').required('Salary is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addEvaluation(values);
    },
  });
  const cancelHandler = () => {
    navigate('/evoluations', { replace: true });
  };
  useEffect(() => {
    (async () => {
      fetchEmployee();
    })();
  }, []);
  const fetchEmployee = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { data, status } = await axios.get(`${URL}/employee`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        data.unshift({ _id: '1', name: '' });
        setEmployee(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addEvaluation = async (values) => {
    const currentEmployee = employees.find((emp) => emp._id === values.name);
    const data = {
      employeeId: values.name,
      percentage: values.percent,
      year: dayjs(values.year).year(),
      salary: values.salary,
      company: currentEmployee.company,
    };
    console.log(data);
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { status, ...restResult } = await axios.post(
        `${URL}/evaluation/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (status === 200) {
        showToast('SUCCESS', 'Employee Added !!');
        navigate('/evoluations', { replace: true });
      }
      console.log(restResult);
    } catch (error) {
      console.log(error);
      showToast('ERROR', 'Try Again Later !!');
    }
  };
  return (
    <Container>
      <div className="header">
        <h4>Add / Edit Employee Evoluation</h4>
      </div>
      <Form
        className="mb-5 mt-5"
        onSubmit={formik.handleSubmit}
      >
        <Form.Group
          className="mb-2"
          controlId="formGroupEmployee"
        >
          <Form.Label>Select Employee</Form.Label>
          <Form.Select
            className="simple-select"
            {...formik.getFieldProps('name')}
            // onChange={(e) => {
            //   console.log(e.target.value);
            // }}
          >
            {employees.map((emp) => (
              <option
                key={emp._id}
                value={emp._id}
              >
                {emp.name}
              </option>
            ))}
          </Form.Select>
          {formik.errors.name && formik.touched.name && (
            <InputError>{formik.errors.name}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formPercent"
        >
          <Form.Label>Improvement Percent </Form.Label>
          <Form.Control
            type="number"
            {...formik.getFieldProps('percent')}
          />
          {formik.errors.percent && formik.touched.percent && (
            <InputError>{formik.errors.percent}</InputError>
          )}
        </Form.Group>
        <Form.Group
          className="mb-2"
          controlId="formGroupYear"
        >
          <Form.Label>Evaluated From</Form.Label>
          <Form.Control
            type="month"
            max={currentDate}
            {...formik.getFieldProps('year')}
          />
          {formik.errors.year && formik.touched.year && (
            <InputError>{formik.errors.year}</InputError>
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
export default AddEvoluation;
