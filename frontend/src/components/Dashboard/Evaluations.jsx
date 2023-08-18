import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Table ,Row} from 'react-bootstrap';
import Evaluation from './Evaluation';
import CustomSlider from '../utils/CustomSlider';
const URL = 'http://localhost:8080/evaluation';
const Evaluations = () => {
  const [myEvaluations, setMyEvaluations] = useState([]);
  const [sliderValues, setSliderValues] = useState([2021, 2023]);
  const [years, setYears] = useState([]);
  let minYear, maxYear;
  const handleSliderChange = (values) => {
    setSliderValues(values);
    const minYear = values[0];
    const maxYear = values[1];
    setYears((pre) => {
      const newYears = [];
      for (let i = minYear; i <= maxYear; i++) newYears.push(i);
      return newYears;
    });
  };
  useEffect(() => {
    (async () => {
      fetchEvaluations();
    })();
  }, []);
  const fetchEvaluations = async () => {
    console.log('fetch');
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
        const allYears = getYears(data);
        setYears(allYears);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getYears = (data) => {
    const tempYears = [];
    data?.forEach((item) => {
      //console.log(item.year);
      if (!tempYears.includes(item.evaluations.year)) {
        tempYears.push(item.evaluations.year);
      }
    });
    return tempYears.sort((a, b) => a - b);
  };
  const tempYear = getYears(myEvaluations);
  minYear = Math.min(...tempYear) || 2020;
  maxYear = Math.max(...tempYear) || 2025;
  return (
    <Container
      fluid
      className="mt-3"
    >
      <CustomSlider
        maxYear={maxYear}
        minYear={minYear}
        sliderValues={sliderValues}
        handleSliderChange={handleSliderChange}
      />
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
                {years.length > 0
                  ? years.map((item) => <th key={item}>{item}</th>)
                  : null}
              </tr>
            </thead>
            <tbody>
              {myEvaluations.map((item, idx) => (
                <Evaluation
                  key={item._id + idx}
                  item={item}
                  idx={idx}
                  years={years}
                />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};
export default Evaluations;
