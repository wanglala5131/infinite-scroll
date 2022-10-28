import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { ResetStyle } from './components/resetStyle';
import { getRepositories } from './api/api';

import RadioArea from './components/RadioArea';
import ItemCard from './components/ItemCard';
import Loading from './components/Loading';

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

// style
const Container = styled.main`
  padding: 0 20px;
  max-width: 800px;
  width: 100%;
  margin: auto;

  h1 {
    margin: 20px 0;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }
`;

const Filter = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;

  label {
    margin: 0 10px 5px 0;
    font-weight: 500;
  }

  input {
    width: 50%;
    min-width: 200px;
    padding-left: 3px;
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  position: relative;
  margin-top: 20px;
  padding: 5px 10px;
  background-color: #7b7b7b;
  border-radius: 5px;
  color: white;
  font-size: 16px;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      filter: brightness(0.9);
      transition: all 0.1s ease-in-out;
      cursor: pointer;
    }
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-size: 18px;
  text-align: center;

  &::after,
  &::before {
    content: '';
    top: 50%;
    height: 2px;
    width: 50px;
    margin: 0 5px;
    background-color: #4f4f4f;
  }
`;

const TextAlert = styled.p`
  text-align: center;
  font-size: 18px;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);

  const [orgName, setOrgName] = useState('nodejs');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [directionstring, setDirectionstring] = useState('asc');
  const [result, setResult] = useState([]);
  const [currentInfo, setCurrentInfo] = useState({
    orgName: '',
    type: '',
    sort: '',
    directionstring: '',
  });

  const isChangeInfo = useMemo(() => {
    return (
      orgName === currentInfo.orgName &&
      type === currentInfo.type &&
      sort === currentInfo.sort &&
      directionstring === currentInfo.directionstring
    );
  }, [orgName, type, sort, directionstring, currentInfo]);

  const searchData = () => {
    if (isChangeInfo) return;

    getPageData();
  };

  const getPageData = () => {
    setIsLoading(true);
    getRepositories({ orgName, type, sort, directionstring })
      .then(res => {
        setIsErrorName(false);
        setResult(res);
      })
      .catch(err => {
        if (err.status === 404) {
          setIsErrorName(true);
        }
      })
      .finally(() => {
        setIsLoading(false);

        setCurrentInfo({
          orgName,
          type,
          sort,
          directionstring,
        });
      });
  };

  useEffect(() => {
    getPageData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <ResetStyle />
      <Container>
        <h1>Organization Repositories Search</h1>

        <Filter>
          <InputBox>
            <label htmlFor="org">Organization Name</label>
            <input
              id="org"
              type="text"
              value={orgName}
              placeholder="nodejs、python"
              onChange={e => {
                setOrgName(e.target.value);
              }}
            />
          </InputBox>

          <RadioArea
            radioId={'Type'}
            options={typeOption}
            currentValue={type}
            setValue={setType}
          />
          <RadioArea
            radioId={'Sort'}
            options={sortOption}
            currentValue={sort}
            setValue={setSort}
          />
          <RadioArea
            radioId={'Direction'}
            options={directionOption}
            currentValue={directionstring}
            setValue={setDirectionstring}
          />
          <SubmitButton disabled={isChangeInfo} onClick={searchData}>
            Search
          </SubmitButton>
        </Filter>

        <Text>Result</Text>

        {result.map(item => {
          return <ItemCard key={item.id} item={item} />;
        })}

        {result.length === 0 && !isErrorName && (
          <TextAlert>Sorry! This result is empty.</TextAlert>
        )}

        {isErrorName && (
          <TextAlert>Sorry! This organization name does not exist</TextAlert>
        )}

        {isLoading && <Loading />}
      </Container>
    </div>
  );
}

export default App;
