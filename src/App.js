import { PageHeader, Col, Row, Button } from 'antd';
import SubscriptionList from './SubscriptionList/SubscriptionList';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  return (
    <div>
      <PageHeader
        ghost={false}
        title="GitHub Release Monitor"
        extra={[
          <Button key="3">Operation</Button>,
          <Button key="2">Operation</Button>,
          <Button key="1" type="primary">
            Primary
          </Button>,
        ]}
      />
      <Row id="content-container">
        <Col xs={24} md={8}>
          <SubscriptionList />
        </Col>
        <Col xs={0} md={16}>
          col
        </Col>
      </Row>
    </div>
  );
};

export default App;
