import React, { useState } from 'react';
import Item from './Item';

export default ({
  items, valueField,
  disabled,
  text = {},
  onChange, onRemove, onOptionsChange,
  onIndexChange,
}) => {
  const [editIndex, setEditIndex] = useState(-1);

  function handleClick(i) {
    if (editIndex === i) {
      setEditIndex(-1);
    } else {
      setEditIndex(i);
    }
  }
  return items.map((item, i) => {
    return <div key={i}>
      <Item
        {...item}
        text={text}
        valueField={valueField}
        editId={editIndex}
        index={i}
        disabled={disabled}
        onClick={handleClick}
        onChange={onChange}
        onRemove={onRemove}
        onOptionsChange={onOptionsChange}
        onIndexChange={onIndexChange}
      />
      <br />
    </div>
  })
}