import React from 'react';
import './index.css';

export default (props) => {
  const { name, value, checkedValue, onChange, children } = props;
  const sValue = String(value);
  return <div onClick={onChange.bind(null, sValue)} className="ZEle-MRadio-Item">
    <div className="ZEle-MRadio-radio">
      <div className={sValue === checkedValue ? 'checked' : ''}></div>
    </div>
    <div className="ZEle-MRadio-label">
      <span>{children}</span>
    </div>
  </div>
}