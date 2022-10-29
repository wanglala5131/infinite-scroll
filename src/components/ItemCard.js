import styled from 'styled-components';

const ItemBox = styled.div`
  margin: 20px 0;
  padding: 10px;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

const Info = styled.div`
  margin: 10px 0;
  line-height: 1.2;

  span {
    font-weight: 500;
  }

  &.description {
    color: gray;
  }
`;

export default function ItemCard({ item }) {
  const timeFormat = time => {
    const currTime = new Date(time);

    return `${currTime.getFullYear()} / 
    ${currTime.getMonth() + 1} / ${currTime.getDay()} `;
  };

  return (
    <ItemBox>
      <Info>
        <span>Full Name:</span> {item.full_name}
      </Info>
      <Info>
        <span>Forks:</span> {item.forks}
      </Info>
      <Info>
        <span>Create Date:</span> {timeFormat(item.created_at)}
      </Info>
      <Info>
        <span>Update Date:</span> {timeFormat(item.updated_at)}
      </Info>
      <Info>
        <span>Pushed Date:</span> {timeFormat(item.pushed_at)}
      </Info>
      {item.language && (
        <Info>
          <span>Language:</span> {item.language}
        </Info>
      )}
      {item.description && (
        <Info className="description">{item.description || ''}</Info>
      )}
      <Info>
        <a href={item.html_url} target="_blank" rel="noreferrer noopenner">
          LINK
        </a>
      </Info>
    </ItemBox>
  );
}
