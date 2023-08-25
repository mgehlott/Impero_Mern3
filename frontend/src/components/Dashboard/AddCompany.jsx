import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { showToast } from '../../utils/tool';
import InputError from '../utils/InputError';
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
      address: '',
      description: '',
      img: '',
    },
    validationSchema: Yup.object({
      company: Yup.string().required('Company name is required'),
      address: Yup.string().required('Company address is required'),
      description: Yup.string().required('Company description is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      addCompany(values);
    },
  });
  const addCompany = async (values) => {
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
    const formData = new FormData();
    formData.append('name', values.company);
    formData.append('address', values.address);
    formData.append('description', values.description);
    formData.append('img', values.img);
    try {
      const { status, ...restResult } = await axios(fullUrl, {
        method: method,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
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
      <Form.Group
        className="mb-2"
        controlId="formGroupCompany"
      >
        <Form.Label>Enter Company</Form.Label>
        <Form.Control
          type="text"
          placeholder="Company name"
          className="mb-4"
          {...formik.getFieldProps('company')}
        />
        {formik.errors.company && formik.touched.company && (
          <InputError>{formik.errors.company}</InputError>
        )}
      </Form.Group>
      <Form.Group
        className="mb-2"
        controlId="formGroupAddress"
      >
        <Form.Label>Company Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter company address"
          className="mb-4"
          {...formik.getFieldProps('address')}
        />
        {formik.errors.address && formik.touched.address && (
          <InputError>{formik.errors.address}</InputError>
        )}
      </Form.Group>
      <Form.Group
        className="mb-2"
        controlId="formGroupDescription"
      >
        <Form.Label>Company Description</Form.Label>
        <Form.Control
          as="textarea"
          style={{ height: '100px' }}
          placeholder="Enter company description"
          className="mb-4"
          {...formik.getFieldProps('description')}
        />
        {formik.errors.description && formik.touched.description && (
          <InputError>{formik.errors.description}</InputError>
        )}
      </Form.Group>
      <Form.Group
        className="mb-2 mt-4"
        controlId="formGroupImage"
      >
        <Form.Label>Upload Company Image</Form.Label>
        <Form.Control
          type="file"
          name="img"
          onChange={(e) => {
            console.log(e.target.files[0]);
            formik.setFieldValue('img', e.target.files[0]);
          }}
        />
      </Form.Group>
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
