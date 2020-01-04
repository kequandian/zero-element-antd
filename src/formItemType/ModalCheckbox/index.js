import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import TableCheckbox from './TableCheckbox';

export default function ModalCheckbox(props) {
  const {
    name, value,
    namespace, options = {},
    props: p,
    onChange,
    handle,
    ...rest
  } = props;
  const {
    title = '选择数据',
    label = 'name', editLabel = label,
    field = name,
    value: optValue = 'id',
    API,
    fields = [],
    saveData,
    requireValid,
    pagination,
  } = options;
  const { onFormatValue, onGetFormData, onSaveOtherValue } = handle;
  const [visible, setVisible] = useState(false);
  const selectedData = useRef({});

  useDidMount(_ => {
    onFormatValue(name, 'toValue');
  });
  function handleChange(value) {
    selectedData.current = {
      value,
      _toValue: value.map(item => item[optValue]),
    };
  }
  function switchVisible() {
    setVisible(!visible);
  }
  function handleSave() {
    onChange(selectedData.current);
    setVisible(false);

    if (saveData) {
      Object.keys(saveData).forEach(key => {
        onSaveOtherValue(key, selectedData.current[saveData[key]]);
      });
    }
  }

  return <>
    <Button
      onClick={switchVisible}
    >
      {echoName(value, onGetFormData, { field, label, editLabel }) || title}
    </Button>
    <Modal
      destroyOnClose
      visible={visible}
      title={title}
      onCancel={switchVisible}
      onOk={handleSave}
    >
      <TableCheckbox
        value={value}
        field={field}
        optValue={optValue}
        onChange={handleChange}
        onGetFormData={onGetFormData}

        API={API}
        fields={fields}
        pagination={pagination}
        requireValid={requireValid}
      />
    </Modal>
  </>
}

/**
 * 显示的名称
 * 优先显示已选择的数据的名称
 *
 * @param {number | object} value
 * @param {function} getFormData
 * @param {object} {
 *   label,
 *   editLabel,
 * }
 * @returns
 */
function echoName(value, getFormData, {
  field,
  label,
  editLabel,
}) {
  if (value) {
    if (Array.isArray(value.value)) {
      return value.value.map(value => value[label]).join(', ');
    }
  }
  const formData = getFormData();
  if (formData) {
    if (typeof formData === 'object') {
      if (Array.isArray(formData[field])) {
        return formData[field].map(item => item[editLabel]).join(', ');
      }
    }
  }
  return undefined;
}
