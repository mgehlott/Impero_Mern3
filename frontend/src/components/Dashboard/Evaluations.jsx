import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
const URL = 'http://localhost:8080/evaluation';
const Evaluations = () => {
  const [myEvaluations, setMyEvaluations] = useState([]);
  useEffect(() => {
    (async () => {
      fetchEvaluations();
    })();
  }, []);
  const fetchEvaluations = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { data, status } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        console.log(data);
        setMyEvaluations(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getYears = (data) => {
    const years = [];
    data?.forEach((item) => {
      const evaluations = item.evaluations;
      evaluations.forEach((e) => {
        if (!years.includes(e.year)) {
          years.push(e.year);
        }
      });
    });
    console.log(years);
    return years.sort((a, b) => a - b);
  };
  const years = getYears(myEvaluations);
  return (
    <Container
      fluid
      className="mt-3"
    >
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
            {years.length > 0
              ? years.map((item) => <th key={item}>{item}</th>)
              : null}
          </tr>
        </thead>
        <tbody>
          {/* {employee.map((emp, idx) => (
            <Employee
              key={emp._id}
              idx={idx}
              {...emp}
            />
          ))} */}
        </tbody>
      </Table>
    </Container>
  );
};
export default Evaluations;
