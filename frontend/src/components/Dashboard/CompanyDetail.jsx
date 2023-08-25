import { Col, Container, Row, Image } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
const URL = 'http://localhost:8080/public/images/';
const defaultImage =
  'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg?w=740';
const CompanyDetail = () => {
  const { state } = useLocation();
  const { name, image, address, description } = state;
  return (
    <Container className="">
      <Row className="mb-3">
        <Col
          className="m-auto"
          md={6}
          lg={4}
        >
          <Image
            className="mb-5"
            src={image ? `${URL}${image}` : defaultImage}
            alt={name}
            style={{ height: '200px', width: '100%' }}
          />
        </Col>
        <Col className="ml-4">
          <h2>{name}</h2>
          <div>
            <span style={{ fontWeight: '600' }}>About Us : </span>{' '}
            <span> {description}</span>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <span style={{ fontWeight: '600' }}> Company Address : </span>{' '}
          <span>{address}</span>
        </Col>
      </Row>
    </Container>
  );
};
export default CompanyDetail;
