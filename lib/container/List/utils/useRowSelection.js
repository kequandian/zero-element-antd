import { useState } from "react";
export default function useRowSelection(namespace, selections) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleSelectChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  }

  const rowSelection = {
    selectedRowKeys,
    selectedRows,
    selections: Array.isArray(selections) ? selections.map(sele => ({ ...sele,
      onSelect: sele.onSelect.bind(null, setSelectedRowKeys)
    })) : selections,
    hideDefaultSelections: true,
    onChange: handleSelectChange
  };
  return rowSelection;
}