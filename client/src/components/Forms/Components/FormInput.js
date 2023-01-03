import React from "react";

function FormInput({
  label,
  name,
  type,
  placeholder,
  required,
  action,
  value,
  icon,
  iconside,
}) {
  if (required) {
    if (icon) {
      return iconside === "left" ? (
        <div>
          <label className="label">{label}</label>
          <div className="control has-icons-left">
            <input
              className="input"
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              required
              onChange={action}
            />
            <span class="icon is-small is-left ">
              <i class={`fas ${icon}`}></i>
            </span>
          </div>
        </div>
      ) : (
        <div>
          <label className="label">{label}</label>
          <div className="control has-icons-right">
            <input
              className="input"
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              required
              onChange={action}
            />
            <span class="icon is-small is-right">
              <i class={`fas ${icon}`}></i>
            </span>
          </div>
        </div>
      );
    } else {
      return (
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
      );
    }
  } else {
    if (icon) {
      return iconside === "left" ? (
        <div>
          <label className="label">{label}</label>
          <div className="control has-icons-left">
            <input
              className="input"
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={action}
            />
            <span class="icon is-small is-left ">
              <i class={`fas ${icon}`}></i>
            </span>
          </div>
        </div>
      ) : (
        <div>
          <label className="label">{label}</label>
          <div className="control has-icons-right">
            <input
              className="input"
              name={name}
              type={type}
              placeholder={placeholder}
              value={value}
              onChange={action}
            />
            <span class="icon is-small is-right">
              <i class={`fas ${icon}`}></i>
            </span>
          </div>
        </div>
      );
    } else {
      return (
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
  }
}

export default FormInput;
