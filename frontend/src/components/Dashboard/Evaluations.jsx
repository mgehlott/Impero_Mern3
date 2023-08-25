import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Table, Row } from 'react-bootstrap';
import Evaluation from './Evaluation';
import CustomSlider from '../utils/CustomSlider';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import useCompanyList from '../../hooks/useCompanyList';
import Select from 'react-select';
const URL = 'http://localhost:8080';
const Evaluations = () => {
  const [myEvaluations, setMyEvaluations] = useState([]);
  const [companies] = useCompanyList();
  const [sliderValues, setSliderValues] = useState([2021, 2023]);
  const [years, setYears] = useState([]);
  const [companySelectValue, setCompanySelectValue] = useState(null);
  const token = useSelector((state) => state.auth.token);
  let minYear = 2020,
    maxYear = 2023;
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
  useEffect(() => {
    (() => {
      fetchYears();
    })();
  }, []);
  const fetchEvaluations = async (query = '') => {
    try {
      const { data, status } = await axios.get(`${URL}/evaluation${query}`, {
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
  // const fetchCompanies = async () => {
  //   try {
  //     const { data } = await axios.get(`${URL}/company`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(data);
  //     //   data.unshift({ _id: '1', name: '' });
  //     setCompanies(data);
  //     return data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const fetchYears = async () => {
    try {
      const { data, status } = await axios.get(`${URL}/evaluation/years`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        console.log(data);
        setYears(data);
        minYear = data[0] | 2020;
        maxYear = data[data.length - 1] | 2025;
        console.log(minYear, maxYear, 'dd', data[0], data[data.length - 1]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues: {
      company: '',
    },
  });
  console.log(formik.values);
  const selectChangeHandler = (e) => {
    console.log('change', e);
    const company = e?.value;
    const query = company ? `?company=${company}` : '';
    setCompanySelectValue(e);
    fetchEvaluations(query);
  };
  const companiesName = companies.map((item) => {
    return { label: item.name, value: item.name };
  });
  console.log('years', years);
    if (myEvaluations.length === 0) {
      return <h2 className="text-center">No Evaluation found.</h2>;
    }
  return (
    <Container
      fluid
      className="mt-3"
    >
      <Row>
        <Col className="d-flex justify-content-between align-items-center mb-5">
          {/* <Form.Group
            className="mb-2"
            controlId="formGroupCompany"
          >
            <Form.Label>Select Company</Form.Label>
            <Form.Select
              className="simple-select"
              name="company"
              value={formik.values.company}
              onChange={selectChangeHandler}
            >
              {companies.map((company) => {
                return (
                  <option
                    key={company._id}
                    value={company.name}
                  >
                    {company.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group> */}
          <Select
            className="basic-single select"
            classNamePrefix="select"
            isClearable={true}
            options={companiesName}
            onChange={selectChangeHandler}
            value={companySelectValue}
          />
          <CustomSlider
            maxYear={maxYear}
            minYear={minYear}
            sliderValues={sliderValues}
            handleSliderChange={handleSliderChange}
          />
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
                {years.length > 0
                  ? years.map((item) => <th key={item}>{item}</th>)
                  : null}
                <th>Total</th>
                <th>Action</th>
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
