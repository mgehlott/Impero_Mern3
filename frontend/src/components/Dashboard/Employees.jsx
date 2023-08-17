import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import Employee from './Employee';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from 'react-icons/tb';
const URL = 'http://localhost:8080/employee';
const Employees = () => {
  const [employee, setEmployee] = useState([]);
  const [sortData, setSortData] = useState({});
  const token = useSelector((state) => state.auth.token);
  console.log(token);
  useEffect(() => {
    (async () => {
      fetchEmployee();
    })();
    console.log('effect');
  }, [sortData]);
  const fetchEmployee = async () => {
    let fullUrl = '';
    if (sortData.sortBy && sortData.order) {
      fullUrl = `${URL}?sortBy=${sortData.sortBy}&order=${sortData.order}`;
    } else {
      fullUrl = URL;
    }
    console.log(fullUrl);
    console.log(token);
    try {
      const { data, status } = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        console.log(data);
        setEmployee(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sortByJoinDate = () => {
    //  const temp = sortData;
    setSortData((prev) => {
      return {
        sortBy: 'joiningDate',
        order: prev.order === 'asc' ? 'desc' : 'asc',
      };
    });
  };
  const sortBySalary = () => {
    setSortData((prev) => {
      return {
        sortBy: 'salary',
        order: prev.order === 'asc' ? 'desc' : 'asc',
      };
    });
  };
  const salrayIcon =
    sortData.sortBy === 'salary' && sortData.order === 'asc' ? (
      <TbArrowBigUpFilled />
    ) : (
      <TbArrowBigDownFilled />
    );
  const joinDateIcon =
    sortData.sortBy === 'joiningDate' && sortData.order === 'asc' ? (
      <TbArrowBigUpFilled />
    ) : (
      <TbArrowBigDownFilled />
    );
  return (
    <Container
      fluid
      className="mt-3"
    >
      <Row>
        <Col className="d-flex justify-content-end mb-5">
          <Link to="/add-employee">
            <Button>Add New</Button>
          </Link>
          <Button
            className="mx-3"
            onClick={sortByJoinDate}
          >
            Join Date
            <span className="mx-2">{joinDateIcon}</span>
          </Button>
          <Button onClick={sortBySalary}>
            Salary
            <span className="mx-2">{salrayIcon}</span>
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table
            striped
            bordered
            hover
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
