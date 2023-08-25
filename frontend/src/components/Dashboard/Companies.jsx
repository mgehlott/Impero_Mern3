import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/tool';
import { useNavigate } from 'react-router-dom';
import useCompanyList from '../../hooks/useCompanyList';
const URL = 'http://localhost:8080/company';
const Companies = () => {
  const [companies] = useCompanyList();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  // const fetchCompanies = async () => {
  //   try {
  //     const { data } = await axios.get(URL, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log(data);
  //     setCompanies(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   console.log('company');
  //   (async () => {
  //     await fetchCompanies();
  //   })();
  // }, []);
  const editBtnHandler = (e, company) => {
    e.stopPropagation();
    console.log('edit');
    navigate('/edit-company', {
      replace: true,
      state: { company },
    });
  };
  const deleteBtnHandler = async (e, companyId) => {
    e.stopPropagation();
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
  const listItemClickHandler = (data) => {
    navigate('/companies/' + data._id, {
      state: {
        name: data.name,
        image: data.image,
        address: data.address,
        description: data.description,
      },
    });
  };
  if (companies.length == 0) {
    return <h2 className='text-center'>No Company Available</h2>;
  }
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
            style={{ cursor: 'pointer' }}
            onClick={() => {
              console.log('item click');
              listItemClickHandler(company);
            }}
          >
            <div>{company.name}</div>
            <div className="icon-container">
              <AiFillEdit
                className="m-2 ml-3"
                fontSize="21px"
                color="#0d6efd"
                onClick={(e) => {
                  editBtnHandler(e, company);
                }}
              />
              <AiFillDelete
                fontSize="21px"
                color="#c90c1e"
                onClick={(e) => {
                  deleteBtnHandler(e, company._id);
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
