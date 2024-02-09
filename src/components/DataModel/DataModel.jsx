import "./dataModel.css";

function DataModel({ handler, children }) {
  return (
    <>
      <div className="data-model">
        {children}
        <span onClick={() => handler(false)}>
          <i className="ri-close-line" />
        </span>
      </div>
      <div className="overlay" onClick={() => handler(false)} />
    </>
  );
}

export default DataModel;
