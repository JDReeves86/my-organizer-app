import React from "react";

function FormInput({ label, name, type, placeholder, required, action, value }) {
  return required ? (
    <div>
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          required
          onChange={action}
        />
      </div>
    </div>
  ) : (
    <div>
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={action}
        />
      </div>
    </div>
  );
}

export default FormInput;
