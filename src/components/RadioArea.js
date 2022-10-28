import styled from 'styled-components';

const RadioContainer = styled.div``;

const Title = styled.p`
  margin: 15px 0 5px;
  font-weight: 500;
`;

const RadioWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  div {
    margin: 0 5px 5px 0;
  }
`;

const RadioBox = styled.div`
  input[type='radio'] {
    display: none;

    &:checked + label {
      background-color: #d0d0d0;
    }
  }

  label {
    display: inline-block;
    padding: 2px 5px;
    border: 1px solid #d0d0d0;
    border-radius: 2px;
    cursor: pointer;
  }
`;

export default function RadioArea({
  radioId,
  options,
  currentValue,
  setValue,
}) {
  return (
    <RadioContainer
      onChange={e => {
        setValue(e.target.value);
      }}
      defaultChecked
    >
      <Title>{radioId}</Title>
      <RadioWrapper>
        {options.map(item => (
          <RadioBox key={item.value}>
            <input
              type="radio"
              name={radioId}
              id={item.value}
              value={item.value}
              defaultChecked={item.value === currentValue}
            />
            <label htmlFor={item.value}>{item.name}</label>
          </RadioBox>
        ))}
      </RadioWrapper>
    </RadioContainer>
  );
}
