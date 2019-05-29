import React from 'react';
import Item from './Item';
import './index.css';

function MRadio(props) {
  const { id, value, children } = props;
  function handleChange(value) {
    if (props.onChange) {
      props.onChange(value);
    }
  }

  return <div className="ZEle-MRadio">
    {React.Children.map(children, child => {
      return React.cloneElement(child, {
        name: id,
        onChange: handleChange,
        checkedValue: value,
      });
    })}
  </div>
}

MRadio.Item = Item;
export default MRadio;