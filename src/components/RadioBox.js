export default function radioBox({ radioId, options, currentValue, setValue }) {
  return (
    <div
      className="radio-wrapper"
      onChange={e => {
        setValue(e.target.value);
      }}
      defaultChecked
    >
      <p>Type</p>
      {options.map(item => (
        <div className="radio-box" key={item.value}>
          <input
            type="radio"
            name={radioId}
            id={item.value}
            value={item.value}
            defaultChecked={item.value === currentValue}
          />
          <label htmlFor={item.value}>{item.name}</label>
        </div>
      ))}
    </div>
  );
}
