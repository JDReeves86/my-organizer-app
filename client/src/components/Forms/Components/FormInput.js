import React from "react";

function FormInput({ label, name, type, placeholder, required, action }) {
  return required ? (
    <div>
      <label className="label">{label}</label>
      <div className="control">
        <input
          className="input"
          name={name}
          type={type}
          placeholder={placeholder}
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
          onChange={action}
        />
      </div>
    </div>
  );
}

export default FormInput;
