import "./dataModel.css";

function DataModel({ handler, children }) {
  return (
    <>
      <div className="data-model">
        {children}
        <span className="modal-close-button" onClick={() => handler(false)}>
          <i className="ri-close-line" />
        </span>
      </div>
      <div className="overlay" onClick={() => handler(false)} />
    </>
  );
}

export default DataModel;
