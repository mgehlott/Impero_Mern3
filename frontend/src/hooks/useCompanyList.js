import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';
const URL = 'http://localhost:8080/company';
const useCompanyList = () => {
  const token = useSelector((state) => state.auth.token);
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    fetchCompanies();
    async function fetchCompanies() {
      setIsLoading(true);
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
      setIsLoading(false);
    }
  }, []);
  return [companies, isLoading];
};
export default useCompanyList;
