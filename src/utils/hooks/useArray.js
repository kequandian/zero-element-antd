import { useState, useRef } from 'react';
import { arrayItemMove } from '@/utils/tool';

export default function useArray(array) {
  const initData = useRef(array);
  const idRef = useRef(0);
  const [newArray, setNewArray] = useState(formatData(array));

  function formatData(arr) {
    return arr.map(i => ({
      ...i,
      _id: idRef.current++,
    }))
  }

  function handleAppend(data) {
    let arr = [...newArray];
    arr.push({
      ...data,
      _id: idRef.current++,
    });

    setNewArray(arr);
  }
  function handleUpdate(id, data) {
    let arr = [...newArray];
    const index = arr.findIndex(i => i._id === id);

    if (index > -1) {
      arr.splice(index, 1, {
        ...data,
        _id: id,
      });
    }

    setNewArray(arr);
  }
  function handleMove(id, type) {
    let arr = [...newArray];
    const index = arr.findIndex(i => i._id === id);

    arrayItemMove(arr, type, index);

    setNewArray(arr);
  }
  function handleRemove(id) {
    let arr = [...newArray];
    const index = arr.findIndex(i => i._id === id);

    if (index > -1) {
      arr.splice(index, 1);
    }

    setNewArray(arr);
  }
  function handleReset() {
    idRef.current = 0;
    setNewArray(formatData(initData.current));
  }

  return [
    newArray,
    {
      onAppend: handleAppend,
      onUpdate: handleUpdate,
      onMove: handleMove,
      onRemove: handleRemove,
      onReset: handleReset,
    }
  ]
}

