import { useState } from 'react';
import { Select, Button } from "antd";
import { octokit } from '../../Octokit';

const { Option } = Select;

const SearchDropdown = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

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
          console.log(val);
          setData(val.data.items);
        })
        .catch((err) => console.log(err));
    };

    timeout = setTimeout(search, 300);
  };

  const onChange = (value) => {
    setSelected(value);
  };

  const onSearch = (phrase) => {
    if (phrase) {
      fetch(phrase);
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
            d => <Option key={d.name}>{d.name}</Option>
          )
        }
      </Select>
      <Button type="primary">Add</Button>
    </>
  );
};

export default SearchDropdown;
