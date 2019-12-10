import React, { useState } from 'react';
import { Input, Icon, Tooltip } from 'antd';

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
  }
  function handleRemote() {
    onRemote(data.id);
  }

  return <div>
    {edit ? (
      <Tooltip
        title={(
          <>
            {onEdit ? (
              <Icon type="save"
                onClick={handleSave}
              />
            )
              : null
            }
            {onRemote ? (
              <Icon type="delete" className="ZEleA-margin-left"
                onClick={handleRemote}
              />
            )
              : null
            }
            <Icon type="rollback" className="ZEleA-margin-left"
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
            <Icon type="form"
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