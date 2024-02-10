import Title from "../Title/Title";
import PropTypes from "prop-types";

function BreadCrump(props) {
  const { trail, back } = props;

  const styles = {
    breadcrumb: {
      listStyle: "none",
      display: "flex",
      justifyContent: "start",
      alignItems: "center",
      width: "fit-content",
    },
    backButton: {
      fontSize: "2.2em",
      color: "var(--light_text_color)",
      transition: "0.5s",
      cursor: "pointer",
      marginRight: "0.3em",
      ...(trail.length > 1 && { color: "var(--sideBar_color)" }),
    },
    breadcrumbItem: {
      color: "var(--light_text_color)",
      display: "inline",
      cursor: "pointer",
    },
  };

  return (
    <>
      <ul style={styles.breadcrumb}>
        <span style={styles.backButton}>
          <i onClick={back} className="ri-arrow-left-circle-line"></i>
        </span>
        {trail.map((item, index) => (
          <li style={styles.breadcrumbItem} key={index}>
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
