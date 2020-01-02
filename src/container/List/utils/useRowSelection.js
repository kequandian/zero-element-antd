import { useState, useRef } from "react";

export default function useRowSelection({ onRefresh }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const options = useRef({});
  const [selections, setSelections] = useState([]);

  function wrapped(func) {
    return function (...params) {
      func(options.current, ...params);
    };
  }

  function handleSelectChange(selectedRowKeys, selectedRows) {
    options.current = {
      selectedRowKeys,
      selectedRows,
      onRefresh,
    };
    setSelectedRowKeys(selectedRowKeys);
  }
  function handleSetSelection(list) {
    if (Array.isArray(list)) {
      setSelections(list.map((item, i) => {
        const { key, title, onClick } = item;

        return {
          key: key || i,
          text: title,
          onSelect: wrapped(onClick),
        }
      }));
    } else {
      console.warn(`无法设置 rowSelection, 传入了非预期的数据格式: ${list}`);
    }
  }

  const rowSelection = {
    selectedRowKeys,
    selections: selections.length > 0 ? selections : false,
    hideDefaultSelections: true,
    onChange: handleSelectChange,
  };

  return [
    rowSelection,
    handleSetSelection,
  ]
}