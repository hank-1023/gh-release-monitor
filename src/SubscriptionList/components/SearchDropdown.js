import { useState } from 'react';
import { Select, Button, Modal } from "antd";
import { octokit } from '../../Octokit';

const { Option } = Select;

const SearchDropdown = ({ onAdd }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addLoading, setAddLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  let timeout;

  const fetch = (phrase) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }

    const search = () => {
      console.log("Searching", phrase);
      octokit.search.repos({
        q: phrase,
      })
        .then((val) => {
          console.log("Repo Response", val);
          setData(val.data.items);
        })
        .catch((err) => console.log(err));
    };

    timeout = setTimeout(search, 200);
  };

  const addRepo = () => {
    let selectedData = data.filter(d => d.name === selected);
    if (selectedData.length === 0
      || !selectedData[0].id
      || !selectedData[0].owner
      || !selectedData[0].name) {
      setErrorText("Please select from the dropdown");
      return;
    }
    else selectedData = selectedData[0];
    const result = {
      id: selectedData.id,
      owner: selectedData.owner.login,
      name: selectedData.name
    };

    setAddLoading(true);
    octokit.repos.getLatestRelease({
      owner: selectedData.owner.login,
      repo: selectedData.name
    })
      .then((val) => {
        console.log("Latest Release", val);
        result.version = val.data.tag_name;
        result.date = val.data.published_at;
        result.isNew = false;
        setData([]);
        setSelected(null);
        onAdd(result);
      })
      .catch(() => {
        Modal.error({
          title: 'Error',
          content: "Couldn't find release info",
        });
      })
      .finally(() => setAddLoading(false));
  };

  const onChange = (value) => {
    setSelected(value);
    setErrorText(null);
  };

  const onSearch = (phrase) => {
    if (errorText)
      setErrorText(null);
    if (phrase) {
      fetch(phrase);
      if (selected)
        setSelected(null);
    } else {
      setData([]);
    }
  };

  return (
    <>
      <div className="search-bar">
        <Select
          showSearch
          value={selected}
          placeholder="Search for repos"
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={onSearch}
          onChange={onChange}
          notFoundContent={null}
        >
          {
            data.map(
              d => <Option key={d.id} value={d.name}>{d.name}</Option>
            )
          }
        </Select>
        <Button type="primary" loading={addLoading} onClick={addRepo}>Add</Button>
      </div>
      <p className="error-text">{errorText}</p>
    </>
  );
};

export default SearchDropdown;
