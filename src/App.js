import { useState, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { ResetStyle } from './components/resetStyle';
import { getRepositories } from './api/api';

import RadioArea from './components/RadioArea';
import ItemCard from './components/ItemCard';
import Loading from './components/Loading';
import GoTop from './components/GoTop';

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
  margin: 20px auto 50px;

  h1 {
    margin: 20px 0;
    font-size: 28px;
    font-weight: 700;
    text-align: center;
  }
`;

const Filter = styled.div`
  border: 3px solid #eee;
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

const ItemWrapper = styled.div`
  position: relative;
`;

const CheckPoint = styled.div`
  position: absolute;
  bottom: 25%;
  left: 0;
`;

function App() {
  const [isStart, setStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  const [orgName, setOrgName] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('created');
  const [direction, setdirection] = useState('asc');
  const [results, setResults] = useState([]);

  const currentPage = useRef(1);
  const [currentInfo, setCurrentInfo] = useState({
    orgName: '',
    type: '',
    sort: '',
    direction: '',
  });

  const isChangeInfo = useMemo(() => {
    return (
      orgName === '' ||
      (orgName === currentInfo.orgName &&
        type === currentInfo.type &&
        sort === currentInfo.sort &&
        direction === currentInfo.direction)
    );
  }, [orgName, type, sort, direction, currentInfo]);

  const searchData = () => {
    if (isChangeInfo) return;

    // 每次 search 就再判斷是否須要重設 observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    setIsLoading(true);
    setIsErrorName(false);
    setIsEnd(false);

    getRepositories({ orgName, type, sort, direction })
      .then(res => {
        setResults(res);

        res.length < 30 ? setIsEnd(true) : setObserver();
      })
      .catch(err => {
        if (err.status === 404) {
          setResults([]);
          setIsErrorName(true);
        }
      })
      .finally(() => {
        currentPage.current = 1;
        setCurrentInfo({
          orgName,
          type,
          sort,
          direction,
        });
        setIsLoading(false);
        setStart(true);
      });
  };

  const observerRef = useRef(null);
  const checkPointRef = useRef(null);

  const setObserver = () => {
    // callback會被cache，所以要重設observer
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: [1],
    });

    observerRef.current = observer;

    setTimeout(() => {
      observerRef.current.observe(checkPointRef.current);
    }, 0);
  };

  const observerCallback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fetchNextData();
      }
    });
  };

  const fetchNextData = () => {
    const nextPage = currentPage.current + 1;
    currentPage.current = nextPage;

    getRepositories({
      orgName,
      type,
      sort,
      direction,
      page: nextPage,
    })
      .then(res => {
        setResults(prev => [...prev, ...res]);

        if (res.length < 30) {
          setIsEnd(true);

          if (observerRef.current) {
            observerRef.current.unobserve(checkPointRef.current);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const textAlert = useMemo(() => {
    return !isStart
      ? ''
      : isErrorName
      ? 'Sorry! This organization name does not exist.'
      : results.length === 0
      ? 'Sorry! This result is empty.'
      : isEnd
      ? 'No more results.'
      : '';
  }, [isStart, isErrorName, isEnd, results.length]);

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
            currentValue={direction}
            setValue={setdirection}
          />
          <SubmitButton disabled={isChangeInfo} onClick={searchData}>
            Search
          </SubmitButton>
        </Filter>

        {isStart && <Text>Result</Text>}

        <ItemWrapper>
          {results.map(item => {
            return <ItemCard key={item.id} item={item} />;
          })}

          <CheckPoint className="check-point" ref={checkPointRef} />
        </ItemWrapper>

        <TextAlert>{textAlert}</TextAlert>

        {isLoading && <Loading />}
        <GoTop />
      </Container>
    </div>
  );
}

export default App;
