import "./inputField.css";
import PropTypes from "prop-types";
import React from "react";

function InputField(props) {
  const {
    type,
    name,
    placeholder,
    value,
    max_length,
    handler,
    isRequired,
  } = props;

  return (
    <>
      <input
        className="input-field-component"
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handler}
        {...(isRequired ? { required: true } : {})}
        maxLength={max_length ? max_length : null}
      />
    </>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  max_length: PropTypes.string,
  handler: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default React.memo(InputField);
