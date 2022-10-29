import { useCallback } from 'react';
import styled from 'styled-components';

const ItemBox = styled.div`
  margin: 20px 0;
  padding: 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  line-height: 1.5;

  .description {
    color: gray;
  }

  span {
    font-weight: 700;
  }
`;

export default function ItemCard({ item }) {
  const timeFormat = useCallback(time => {
    const currTime = new Date(time);
    const year = currTime.getFullYear().toString().padStart(4, '0');
    const month = (currTime.getMonth() + 1).toString().padStart(2, '0');
    const date = currTime.getDay().toString().padStart(2, '0');

    return `${year}/${month}/${date}`;
  }, []);

  return (
    <ItemBox>
      <p>
        <span>Full Name:</span> {item.full_name}
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
  );
}
