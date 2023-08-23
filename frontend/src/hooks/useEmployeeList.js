import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
const URL = 'http://localhost:8080/employee';
const useEmployeeList = (salary, joiningDate) => {
  const token = useSelector((state) => state.auth.token);
  const [employee, setEmployee] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchEmployee(salary, joiningDate);
    async function fetchEmployee() {
      let fullUrl = URL;
      setIsLoading(true);
      if (salary === 'Salary') return;
      if (salary && joiningDate) {
        fullUrl = fullUrl + `?salary=${salary}&joiningDate=${joiningDate}`;
      } else if (salary) {
        fullUrl = fullUrl + `?salary=${salary}`;
      } else if (joiningDate) {
        fullUrl = fullUrl + `?joiningDate=${joiningDate}`;
      }
      console.log(fullUrl);
      try {
        const { data, status } = await axios.get(fullUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (status === 200) {
          console.log(data);
          setEmployee(data);
        }
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }
  }, [salary, joiningDate]);
  return [employee, isLoading];
};
export default useEmployeeList;
