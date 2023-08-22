import axios from 'axios';
import { Modal, Button, Table } from 'react-bootstrap';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/tool';
import { useNavigate } from 'react-router-dom';
const CustomModal = ({ show, modalCloseHandler, item }) => {
  console.log('modal', item);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const deleteBtnHandler = async (employeeId, companyId, year) => {
    console.log(employeeId, companyId, year);
    try {
      const { data, status } = await axios.delete(
        'http://localhost:8080/evaluation/delete',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            employeeId,
            companyId,
            year,
          },
        }
      );
      if (status == 200) {
        console.log('delete');
        showToast('SUCCESS', 'Evaluation Deleted !!');
        modalCloseHandler();
        navigate('/employees', { replace: true });
      }
    } catch (error) {
      console.log(error);
      showToast('ERROR', 'Try Again Later');
    }
  };
  const editBtnHandler = (name, percentage, salary, year) => {
    navigate('/add-evoluation', {
      replace: true,
      state: {
        name,
        percentage,
        salary,
        year,
      },
    });
  };
  return (
    <Modal
      show={show}
      onHide={modalCloseHandler}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Select Action</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 className="mb-4 text-center">
          Emp Name : <span className="text-capitalize">{item.name}</span>
        </h4>
        <Table
          striped
          bordered
          hover
          size="sm"
        >
          <thead>
            <tr>
              <th>Year</th>
              <th>Company</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {item.evaluations.map((it) => (
              <tr key={it.year}>
                <td>{it.year}</td>
                <td>{it.company.name}</td>
                <td>{it.salary}</td>
                <td>
                  <div className="icon-container">
                    {/* <AiFillEdit
                      className="m-2 ml-3"
                      fontSize="21px"
                      color="#0d6efd"
                    />
                    <AiFillDelete
                      fontSize="21px"
                      color="#c90c1e"
                    /> */}
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        editBtnHandler(
                          item.name,
                          it.percentage,
                          it.salary,
                          it.year
                        )
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        deleteBtnHandler(
                          item._id,
                          it.company.companyId,
                          it.year
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={modalCloseHandler}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default CustomModal;
