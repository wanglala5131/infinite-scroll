import { useEffect, useState } from 'react';
import { getRepositories } from './api/api';

import RadioBox from './components/RadioBox';

// radio options
const typeOption = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Public',
    value: 'public',
  },
  {
    name: 'Private',
    value: 'private',
  },
  {
    name: 'Forks',
    value: 'forks',
  },
  {
    name: 'Sources',
    value: 'sources',
  },
  {
    name: 'Member',
    value: 'member',
  },
  {
    name: 'Internal',
    value: 'internal',
  },
];
const sortOption = [
  {
    name: 'Created',
    value: 'created',
  },
  {
    name: 'Updated',
    value: 'updated',
  },
  {
    name: 'Pushed',
    value: 'pushed',
  },
  {
    name: 'Full Name',
    value: 'full_name',
  },
];
const directionOption = [
  {
    name: 'Ascend',
    value: 'asc',
  },
  {
    name: 'Descend',
    value: 'desc',
  },
];

function App() {
  const [orgName, setOrgName] = useState('nodejs');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [directionstring, setDirectionstring] = useState('asc');
  const [result, setResult] = useState([]);

  useEffect(() => {
    getPageData();
  }, []);

  const searchData = () => {
    getPageData();
  };

  const getPageData = () => {
    getRepositories({ orgName, type, sort, directionstring })
      .then(res => {
        console.log(res);
        setResult(res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <div className="App">
      <h1>Organization Repositories Search</h1>
      <input
        type="text"
        value={orgName}
        onChange={e => {
          setOrgName(e.target.value);
        }}
      />

      <RadioBox
        radioId={'type'}
        options={typeOption}
        currentValue={type}
        setValue={setType}
      />
      <RadioBox
        radioId={'sort'}
        options={sortOption}
        currentValue={sort}
        setValue={setSort}
      />
      <RadioBox
        radioId={'directionstring'}
        options={directionOption}
        currentValue={directionstring}
        setValue={setDirectionstring}
      />
      <button onClick={searchData}>Search</button>

      {result.map(item => {
        return (
          <div>
            <p>{item.name}</p>
            <p>{item.forks}</p>
            <p>{item.created_at}</p>
            <p>{item.description || ''}</p>
            <p>{item.language}</p>
            <p>{item.url}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
