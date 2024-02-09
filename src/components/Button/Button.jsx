import "./button.css";
import Loader from "../ButtonLoader/Loader";
import PropTypes from "prop-types";

function Button(props) {
  const { text, isLoading, handler, backgroundColor, textColor } = props;

  return (
    <button
      className="button-component"
      onClick={handler}
      style={{ backgroundColor: `${backgroundColor}`, color: textColor }}
    >
      {isLoading ? <Loader /> : text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  isLoading: PropTypes.bool,
  handler: PropTypes.func,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Button;
