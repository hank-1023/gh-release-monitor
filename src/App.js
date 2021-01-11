import { useState, useEffect } from 'react';
import { PageHeader, Col, Row, Button } from 'antd';
import SubscriptionList from './SubscriptionList/SubscriptionList';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState({});

  useEffect(() => {
    const storedStr = localStorage.getItem("repos");
    if (storedStr) {
      const parsed = JSON.parse(storedStr);
      setRepos(parsed);
    }
  }, []);

  useEffect(() => {
    const str = JSON.stringify(repos);
    console.log("saving", str);
    localStorage.setItem("repos", str);
  }, [repos]);

  const onAdd = (data) => {
    const newRepo = { ...repos };
    newRepo[data.id] = data;
    console.log("Adding", data);
    setRepos(newRepo);
  };

  const onDelete = (id) => {
    const newRepo = { ...repos };
    delete newRepo[id];
    console.log("Deleting", id);
    setRepos(newRepo);
  };

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
          <SubscriptionList
            repos={repos}
            onAdd={onAdd}
            onDelete={onDelete}
          />
        </Col>
        <Col xs={0} md={16}>
          col
        </Col>
      </Row>
    </div>
  );
};

export default App;
