import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const URL = 'http://localhost:8080/company/add';
const AddCompany = () => {
  // const [company, setCompany] = useState('');
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      company: '',
    },
    validationSchema: Yup.object({
      company: Yup.string().required('Company name is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addCompany(values.company);
    },
  });
  const addCompany = async (company) => {
    const token = JSON.parse(localStorage.getItem('token'));
    try {
      const { status, ...restResult } = await axios.post(
        URL,
        { name: company },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (status === 200) {
        navigate('/companies');
      }
      console.log(restResult);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Control
        type="text"
        placeholder="Company name"
        className="mb-4"
        {...formik.getFieldProps('company')}
      />
      <Button
        variant="primary"
        type="submit"
      >
        Add
      </Button>
    </Form>
  );
};
export default AddCompany;
