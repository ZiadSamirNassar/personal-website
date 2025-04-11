import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../style/Header.css';

const DynamicHeader = () => {
  const [headerData, setHeaderData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    location: '',
    summary: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../data/Cv');
        const { personal_info, summary } = response.default;
        
        setHeaderData({
          name: personal_info?.name || '',
          email: personal_info?.email || '',
          phone: personal_info?.phone || '',
          website: personal_info?.website || '',
          location: personal_info?.location || '',
          summary: summary || ''
        });
      } catch (err) {
        setError('Failed to load profile data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading profile...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (

    <Container className="header" id='personal_info'>
      <Row>
        <Col sm={4}>

          <div className="contact-info">
            <p>Hi, iam <span>{headerData.name}</span></p> 
            {headerData.email && <p>📧 {headerData.email}</p>}
            {headerData.phone && <p>📱 {headerData.phone}</p>}
            {headerData.website && <p>🌐 {headerData.website}</p>}
            {headerData.location && <p>📍 {headerData.location}</p>}
          </div>

        </Col>
        
        <Col sm={8}>
        {headerData.summary && <p className="summary" id='summary'>{headerData.summary}</p>}
        </Col>

      </Row>

  </Container>

  );
};

export default DynamicHeader;