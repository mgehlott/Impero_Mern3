import { Container } from 'react-bootstrap';
import Navigationbar from '../Navigationbar/Navigationbar';
import { Outlet } from 'react-router-dom';
const Dashboard = () => {
  return (
    <>
      <Navigationbar />
      <Container className="mt-5">
        <Outlet />
        {/* <Routes>
          <Route
            path="/employees"
            element={<Employees />}
          />
          <Route
            path="/companies"
            element={<Companies />}
          />
          <Route
            path="/add-company"
            element={<AddCompany />}
          />
          <Route
            path="/add-employee"
            element={<AddEmployee />}
          />
          <Route
            path="/evoluations"
            element={<Evaluations />}
          />
          <Route path="/add-evoluation"
            element={<AddEvoluation/>}
          />
        </Routes> */}
      </Container>
    </>
  );
};
export default Dashboard;
