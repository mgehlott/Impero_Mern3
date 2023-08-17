import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
const Navigationbar = () => {
  const dispatch = useDispatch();
  const logOutHanlder = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    dispatch(logout());
    console.log('logout');
  };
  return (
    <Nav className="d-flex justify-content-between shadow-sm ">
      <div className="d-flex">
        <NavDropdown
          title="Company"
          id="basic-nav-dropdown"
        >
          <LinkContainer to="/add-company">
            <NavDropdown.Item>Add Company</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/companies">
            <NavDropdown.Item>View Company</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
          title="Employee"
          id="basic-nav-dropdown"
        >
          <LinkContainer to="/add-employee">
            <NavDropdown.Item>Add Employee</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/employees">
            <NavDropdown.Item>View Employee</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
        <NavDropdown
          title="Evaluation"
          id="basic-nav-dropdown"
        >
          <LinkContainer to="/add-evoluation">
            <NavDropdown.Item>Add Evoluation</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/evoluations">
            <NavDropdown.Item>View Evoluation</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      </div>
      <div className="p-2">
        <Button
          variant="primary"
          onClick={logOutHanlder}
        >
          Logout
        </Button>
      </div>
    </Nav>
  );
};
export default Navigationbar;
