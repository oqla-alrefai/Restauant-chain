import "./inputField.css";
import PropTypes from "prop-types";
import React from "react";

function InputField(props) {
  const { type, name, label: label, value, width, handler, isRequired } = props;

  return (
    <>
      <label className="input-label" htmlFor={name}>
        {label}
        <input
          className="input-field-component"
          style={{width: width}}
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={handler}
          {...(isRequired ? { required: true } : {})}
        />
      </label>
    </>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  width: PropTypes.string,
  handler: PropTypes.func,
  isRequired: PropTypes.bool,
};

export default React.memo(InputField);
