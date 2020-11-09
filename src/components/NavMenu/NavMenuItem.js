import React, { useState } from 'react';
import { Input, Tooltip } from 'antd';
import {
  SaveOutlined,
  DeleteOutlined,
  RollbackOutlined,
  FormOutlined,
} from '@ant-design/icons';

export default function NavMenuItem({
  data,
  onEdit,
  onRemote,
}) {
  const [edit, setEdit] = useState(false);
  const value = data.title || data.name;
  const [v, setV] = useState(value);

  function handleEdit() {
    setEdit(true);
  }
  function cancelEdit() {
    setEdit(false);
    setV(value);
  }
  function handleInputChange(e) {
    const value = e.target.value;
    setV(value);
  }

  function handleSave() {
    onEdit(data.id, v);
    setEdit(false);
  }
  function handleRemote() {
    onRemote(data.id);
    setEdit(false);
  }

  return <div>
    {edit ? (
      <Tooltip
        defaultVisible
        title={(
          <>
            {onEdit ? (
              <SaveOutlined
                onClick={handleSave}
              />
            )
              : null
            }
            {onRemote ? (
              <DeleteOutlined className="ZEleA-margin-left"
                onClick={handleRemote}
              />
            )
              : null
            }
            <RollbackOutlined className="ZEleA-margin-left"
              onClick={cancelEdit}
            />
          </>
        )}
      >
        <Input
          value={v}
          onChange={handleInputChange}
        />
      </Tooltip>
    ) :
      (
        <>
          {onEdit || onRemote ? (
            <FormOutlined
              onClick={handleEdit}
            />
          )
            : null}
          {v}
        </>
      )
    }
  </div>
}