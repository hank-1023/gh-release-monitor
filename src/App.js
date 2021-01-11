import { useState, useEffect } from 'react';
import { PageHeader, Col, Row, Button, Modal, message } from 'antd';
import SubscriptionList from './SubscriptionList/SubscriptionList';
import { octokit } from './Octokit';
import ReleaseNotes from './ReleaseNotes';
import 'antd/dist/antd.css';
import './App.css';

const App = () => {
  const [repos, setRepos] = useState({});
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [selectedID, setSelectedID] = useState(null);

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
    if (data.id in repos) {
      Modal.error({
        title: 'Error',
        content: "Repo already in tracking",
      });
    } else {
      const newRepo = { ...repos };
      newRepo[data.id] = data;
      console.log("Adding", data);
      setRepos(newRepo);
    }

  };

  const onDelete = (id) => {
    const newRepo = { ...repos };
    delete newRepo[id];
    console.log("Deleting", id);
    setRepos(newRepo);
  };

  const onDismissNew = (id) => {
    const newRepo = { ...repos };
    newRepo[id].hasNewVersion = false;
    setRepos(newRepo);
  };

  const onSelect = (id) => {
    console.log("Selected", id);
    setSelectedID(id);
  };

  const refresh = async () => {
    setRefreshLoading(true);
    const newRepos = {};
    try {
      let reposArr = Object.values(repos);
      for (let i = 0; i < reposArr.length; i++) {
        const repo = reposArr[i];
        console.log("Checking", repo);
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
          result.releaseNotes = val.data.body;
          result.hasNewVersion = true;
          newRepos[repo.id] = result;
        } else {
          newRepos[repo.id] = repo;
        }
        if (i === Object.values(repos).length - 1) {
          setRepos(newRepos);
          message.success('Refresh complete');
        }
      }
    } catch (err) {
      console.log(err);
      message.error("Refresh error, please check your network condition");
    } finally {
      setRefreshLoading(false);
    }
  };

  const clearStorage = () => {
    localStorage.clear();
    setRepos({});
  };

  return (
    <div>
      <PageHeader
        ghost={false}
        title="GitHub Release Monitor"
        extra={[
          <Button key="clear" onClick={clearStorage}>Clear Local Storage</Button>,
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
            onSelect={onSelect}
            selectedID={selectedID}
          />
        </Col>
        <Col xs={0} md={16}>
          <ReleaseNotes repos={repos} selectedID={selectedID} />
        </Col>
      </Row>
    </div>
  );
};

export default App;
