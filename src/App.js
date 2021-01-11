import { useState, useEffect } from 'react';
import { PageHeader, Col, Row, Button } from 'antd';
import SubscriptionList from './SubscriptionList/SubscriptionList';
import { octokit } from './Octokit';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState({});
  const [refreshLoading, setRefreshLoading] = useState(false);

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

  const onDismissNew = (id) => {
    const newRepo = { ...repos };
    newRepo[id].isNew = false;
    setRepos(newRepo);
  };

  const refresh = () => {
    setRefreshLoading(true);
    const newRepos = {};
    try {
      Object.values(repos).forEach(async (repo, i) => {
        const val = await octokit.repos.getLatestRelease({
          owner: repo.owner,
          repo: repo.name
        });
        console.log("Latest Release", val);
        if (val.data.published_at !== repo.date) {
          console.log("Found new version: ", val.data.tag_name);
          const result = { ...repo };
          result.version = val.data.tag_name;
          result.date = val.data.published_at;
          result.isNew = true;
          newRepos[repo.id] = result;
        } else {
          newRepos[repo.id] = repo;
        }
        if (i === Object.values(repos).length - 1) {
          setRepos(newRepos);
        }
      });
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        title="GitHub Release Monitor"
        extra={[
          <Button key="clear">Clear Local Storage</Button>,
          <Button key="refresh" type="primary" onClick={refresh} loading={refreshLoading}>Refresh</Button>,
        ]}
      />
      <Row id="content-container">
        <Col xs={24} md={8}>
          <SubscriptionList
            repos={repos}
            onAdd={onAdd}
            onDelete={onDelete}
            onDismissNew={onDismissNew}
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
