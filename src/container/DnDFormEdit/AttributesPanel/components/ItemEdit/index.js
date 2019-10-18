import React, { useState } from 'react';
import Item from './Item';

export default ({ items, disabled, onChange, onRemove, onOptionsChange }) => {
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
        editId={editIndex}
        index={i}
        disabled={disabled}
        onClick={handleClick}
        onChange={onChange}
        onRemove={onRemove}
        onOptionsChange={onOptionsChange}
      />
      <br />
    </div>
  })
}