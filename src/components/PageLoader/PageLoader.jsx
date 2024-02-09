import "./pageLoader.css";

function PageLoader({ scale, top, left }) {
  return (
    <>
      <section
        className="page-loader-section"
        style={{
          scale: scale ? `${scale}` : "1",
          top: top ? `${top}` : "50%",
          left: left ? `${left}` : "50%",
        }}
      >
        <section className="page_loader">
          <div style={{ "--size": 8, "--i": 1 }}></div>
          <div style={{ "--size": 6, "--i": 2 }}></div>
          <div style={{ "--size": 4, "--i": 3 }}></div>
        </section>
      </section>
    </>
  );
}

export default PageLoader;
