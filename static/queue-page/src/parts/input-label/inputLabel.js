import React from "react";
const InputLabelWrapper = (props) => {
  const { children, label } = props;
  return (
    <div className="row mb-2 w-100">
      <div className="col-4">{label}</div>
      <div className="col-8">{children}</div>
    </div>
  );
};
export default InputLabelWrapper;
