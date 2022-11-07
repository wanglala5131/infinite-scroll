import { useCallback, useMemo } from 'react';
import styled from 'styled-components';

const BoxContainer = styled.div`
  position: absolute;
  padding: 10px 0;
  width: 100%;
  height: 245px;
`;

const ItemBox = styled.div`
  padding: 10px;
  height: 100%;
  border: 1px solid #eee;
  border-radius: 5px;
  line-height: 1.5;

  .description {
    color: gray;
  }

  span {
    font-weight: 700;
  }
`;

export default function ItemCard({ item, index }) {
  const timeFormat = useCallback(time => {
    const currTime = new Date(time);
    const year = currTime.getFullYear().toString().padStart(4, '0');
    const month = (currTime.getMonth() + 1).toString().padStart(2, '0');
    const date = currTime.getDay().toString().padStart(2, '0');

    return `${year}/${month}/${date}`;
  }, []);

  const itemTop = useMemo(() => {
    return `${245 * index}px`;
  }, [index]);

  return (
    <BoxContainer style={{ top: itemTop }}>
      <ItemBox>
        <p>
          <span>Full Name {index}:</span> {item.full_name}
        </p>
        <p>
          <span>Forks:</span> {item.forks}
        </p>
        <p>
          <span>Create Date:</span> {timeFormat(item.created_at)}
        </p>
        <p>
          <span>Update Date:</span> {timeFormat(item.updated_at)}
        </p>
        <p>
          <span>Pushed Date:</span> {timeFormat(item.pushed_at)}
        </p>
        <p>
          <span>Language:</span> {item.language}
        </p>
        <p className="description">{item.description}</p>
        <a href={item.html_url} target="_blank" rel="noreferrer noopenner">
          LINK
        </a>
      </ItemBox>
    </BoxContainer>
  );
}
