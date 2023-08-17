import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
const URL = 'http://localhost:8080/company';
const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const fetchCompanies = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { data } = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
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
  return (
    <Container fluid>
      <ListGroup
        as="ol"
        numbered
      >
        {companies.map((company) => (
          <ListGroup.Item
            as="li"
            key={company._id}
          >
            {company.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
export default Companies;
