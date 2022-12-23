import React from "react";

function FormSelect({ label, name, options, required, action }) {
  return required ? (
    <div>
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select name={name} required onChange={action}>
            {options.map((el, i) => {
              return <option key={i}>{el}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <label className="label">{label}</label>
      <div className="control">
        <div className="select">
          <select name={name}>
            {options.map((el, i) => {
              return <option key={i}>{el}</option>;
            })}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FormSelect;
