import "./title.css";
import PropTypes from "prop-types";

function Title(props) {
  const { text, level } = props;

  const getHeaderElement = () => {
    switch (level) {
      case 1:
        return <h1 className="title-component">{text}</h1>;
      case 2:
        return <h2 className="title-component">{text}</h2>;
      case 3:
        return <h3 className="title-component">{text}</h3>;
      case 4:
        return <h4 className="title-component">{text}</h4>;
      case 5:
        return <h5 className="title-component">{text}</h5>;
    }
  };

  return getHeaderElement();
}

Title.propTypes = {
  text: PropTypes.string.isRequired,
  level: PropTypes.number,
};

Title.defaultProps = {
  level: 2,
};

export default Title;
