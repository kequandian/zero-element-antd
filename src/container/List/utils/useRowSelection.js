import { useState } from "react";

export default function useRowSelection() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  function handleSelectChange(selectedRowKeys, selectedRows) {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  }

  const rowSelection = {
    selectedRowKeys,
    selectedRows,
    hideDefaultSelections: true,
    onChange: handleSelectChange,
  };

  return rowSelection;
}