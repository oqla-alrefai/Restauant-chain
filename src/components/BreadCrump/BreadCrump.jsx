import Title from "../Title/Title";
import PropTypes from "prop-types";
import "./breadCrump.css";

function BreadCrump(props) {
  const { trail, back } = props;

  const styles = {
    backButton: {
      ...(trail.length > 1 && { color: "var(--sideBar_color)" }),
    },
  };

  return (
    <>
      <ul className="breadcrumb">
        <span style={styles.backButton} className="back-button">
          <i onClick={back} className="ri-arrow-left-circle-line"></i>
        </span>
        {trail.map((item, index) => (
          <li className="breadcrumb-item" key={index}>
            <Title text={item} />
          </li>
        ))}
      </ul>
    </>
  );
}

BreadCrump.propTypes = {
  trail: PropTypes.array,
  back: PropTypes.func,
};

export default BreadCrump;
