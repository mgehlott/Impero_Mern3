import './App.css';
import Login from './components/Login/Login';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Dashboard from './components/Dashboard/Dashboard';
import { ToastContainer } from 'react-toastify';
import ProtectedRoutes from './components/utils/ProtectedRoutes';
import AddCompany from './components/Dashboard/AddCompany';
import Companies from './components/Dashboard/Companies';
import Employees from './components/Dashboard/Employees';
import AddEmployee from './components/Dashboard/AddEmployee';
import AddEvoluation from './components/Dashboard/AddEvoluation';
import Evaluations from './components/Dashboard/Evaluations';
function App() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <>
      <ToastContainer
        autoClose={1500}
        pauseOnHover={false}
      />
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/"
            exact
            element={<Dashboard />}
          >
            <Route
              index
              element={<AddEmployee />}
            />
            <Route
              path="/add-company"
              element={<AddCompany />}
            />
            <Route
              path="companies"
              element={<Companies />}
            />
            <Route
              path="employees"
              element={<Employees />}
            />
            <Route
              path="add-employee"
              element={<AddEmployee />}
            />
            <Route
              path="add-evoluation"
              element={<AddEvoluation />}
            />
            <Route
              path="evoluations"
              element={<Evaluations />}
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace={true}
            />
          }
        />
      </Routes>
    </>
  );
}
export default App;
