import { useState } from 'react';
import { Select, Button } from "antd";
import { octokit } from '../../Octokit';

const { Option } = Select;

const SearchDropdown = ({ onAdd }) => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [addLoading, setAddLoading] = useState(false);

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

    timeout = setTimeout(search, 300);
  };

  const addRepo = () => {
    setAddLoading(true);
    let selectedData = data.filter(d => d.name === selected);
    if (selectedData.length === 0) { return; }
    else selectedData = selectedData[0];
    const result = {
      id: selectedData.id,
      owner: selectedData.owner.login,
      name: selectedData.name
    };
    octokit.repos.getLatestRelease({
      owner: selectedData.owner.login,
      repo: selectedData.name
    })
      .then((val) => {
        console.log("Latest Release", val);
        result.version = val.data.tag_name;
        result.date = val.data.published_at;
        onAdd(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setAddLoading(false));
  };

  const onChange = (value) => {
    setSelected(value);
  };

  const onSearch = (phrase) => {
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
    </>
  );
};

export default SearchDropdown;
