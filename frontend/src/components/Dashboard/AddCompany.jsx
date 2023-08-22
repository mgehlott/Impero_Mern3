import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/tool';
const URL = 'http://localhost:8080/company';
const AddCompany = () => {
  // const [company, setCompany] = useState('');
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state);
  const formik = useFormik({
    initialValues: {
      company: state ? state.company.name : '',
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
    let fullUrl = URL;
    let method;
    if (state) {
      fullUrl += `/edit/${state.company._id}`;
      method = 'put';
      console.log('edit');
    } else {
      fullUrl += '/add';
      method = 'post';
      console.log('add');
    }
    try {
      const { status, ...restResult } = await axios(fullUrl, {
        method: method,
        data: { name: company },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (status === 200) {
        showToast('SUCCESS', 'Company Added !!');
        navigate('/companies');
      }
      console.log(restResult);
    } catch (error) {
      console.log(error);
      showToast('ERROR', 'Try Again Later !!');
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
        Save
      </Button>
    </Form>
  );
};
export default AddCompany;
