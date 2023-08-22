import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/tool';
import { useNavigate } from 'react-router-dom';
const URL = 'http://localhost:8080/company';
const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
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
  const editBtnHandler = (company) => {
    console.log('edit');
    navigate('/edit-company', {
      replace: true,
      state: { company },
    });
  };
  const deleteBtnHandler = async (companyId) => {
    try {
      const { data, status } = await axios.delete(
        `${URL}/delete/${companyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(data, status);
      if (status === 200) {
        showToast('SUCCESS', 'Company Deleted !!');
        navigate('/add-company', { replace: true });
      } else {
        console.log('error');
        showToast('ERROR', data.response.data);
      }
    } catch (error) {
      showToast('ERROR', 'Currently You Can Not Delete');
      console.log(error);
    }
  };
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
            className="d-flex justify-content-between"
          >
            <div>{company.name}</div>
            <div className="icon-container">
              <AiFillEdit
                className="m-2 ml-3"
                fontSize="21px"
                color="#0d6efd"
                onClick={() => {
                  editBtnHandler(company);
                }}
              />
              <AiFillDelete
                fontSize="21px"
                color="#c90c1e"
                onClick={() => {
                  deleteBtnHandler(company._id);
                }}
              />
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};
export default Companies;
