import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import Employee from './Employee';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import useEmployeeList from '../../hooks/useEmployeeList';
const URL = 'http://localhost:8080/employee';
const Employees = () => {
  const formik = useFormik({
    initialValues: {
      joiningDate: '',
      salary: '',
    },
  });
  const { salary, joiningDate } = formik.values;
  const [employee] = useEmployeeList(salary, joiningDate);
  // useEffect(() => {
  //   (async () => {
  //     fetchEmployee();
  //   })();
  //   console.log('effect');
  // }, [salary, joiningDate]);
  // const fetchEmployee = async () => {
  //   let fullUrl = URL;
  //   if (salary === 'Salary') return;
  //   if (salary && joiningDate) {
  //     fullUrl = fullUrl + `?salary=${salary}&joiningDate=${joiningDate}`;
  //   } else if (salary) {
  //     fullUrl = fullUrl + `?salary=${salary}`;
  //   } else if (joiningDate) {
  //     fullUrl = fullUrl + `?joiningDate=${joiningDate}`;
  //   }
  //   console.log(fullUrl);
  //   try {
  //     const { data, status } = await axios.get(fullUrl, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (status === 200) {
  //       console.log(data);
  //       setEmployee(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  if (employee.length === 0) {
    return <h2 className="text-center">No Employee found.</h2>;
  }
  return (
    <Container
      fluid
      className="mt-3 "
    >
      <Row>
        <Col className="d-flex justify-content-end mb-5">
          <Link to="/add-employee">
            <Button>Add New</Button>
          </Link>
          <div>
            <Form.Control
              className="styled-date"
              type="date"
              {...formik.getFieldProps('joiningDate')}
            />
          </div>
          <Form.Select
            className="simple-select salary-select"
            aria-label="salary"
            onChange={formik.handleChange('salary')}
          >
            <option>Salary</option>
            <option value={10000}>10000</option>
            <option value={20000}>20000</option>
            <option value={50000}>50000</option>
            <option value={100000}>100000</option>
          </Form.Select>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            striped
            bordered
            hover
            className="container-shadow"
          >
            <thead>
              <tr>
                <th>S.NO.</th>
                <th>Emp Name</th>
                <th>Comp Name</th>
                <th>JoinDate</th>
                <th>BirthDate</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((emp, idx) => (
                <Employee
                  key={emp._id}
                  idx={idx}
                  {...emp}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Employees;
