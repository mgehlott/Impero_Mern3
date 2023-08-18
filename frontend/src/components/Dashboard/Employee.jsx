import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { showToast } from '../../utils/tool';
const URL = 'http://localhost:8080';
const Employee = ({
  idx,
  _id,
  name,
  company,
  joiningDate,
  birthDate,
  salary,
  resignationDate,
  email,
}) => {
  const navigate = useNavigate();
  const joinDate = new Date(joiningDate).toLocaleDateString();
  const bDate = new Date(birthDate).toLocaleDateString();
  const deleteHanlder = async () => {
    console.log('delete');
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { status, ...restResult } = await axios.delete(
        `${URL}/employee/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        showToast('SUCCESS', 'Employee deleted !!');
        navigate('/add-employee', { replace: true });
      }
      console.log(restResult);
    } catch (error) {
      showToast('ERROR', 'Try again later !!');
      console.log(error);
    }
  };
  const editHandler = () => {
    console.log(company);
    navigate('/edit-employee', {
      replace: true,
      state: {
        idx,
        _id,
        name,
        company,
        joiningDate,
        birthDate,
        salary,
        resignationDate,
        email,
      },
    });
  };
  return (
    <tr>
      <td>{idx + 1}</td>
      <td>{name}</td>
      <td>{company.name}</td>
      <td>{joinDate}</td>
      <td>{bDate}</td>
      <td>{salary}</td>
      <td className="d-flex justify-content-around align-items-center">
        <AiFillEdit
          className="m-2 ml-3"
          fontSize="21px"
          color="#0d6efd"
          onClick={editHandler}
        />
        <AiFillDelete
          fontSize="21px"
          color="#c90c1e"
          onClick={deleteHanlder}
        />
      </td>
    </tr>
  );
};
export default Employee;
