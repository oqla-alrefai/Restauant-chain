import "./inputField.css";
import PropTypes from "prop-types";
import React from "react";

function InputField(props) {
  const { type, name, placeholder, value, handler, isRequired} = props;

  return (
    <input
      className="input-field-component"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handler}
      {...(isRequired ? { required: true } : {})}
    />
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handler: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default React.memo(InputField);
