import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import TableSelect from './TableSelect';

export default function ModalRadio(props) {
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
    value: optValue = 'id',
    API,
    fields = [],
    saveData,
  } = options;
  const { onFormatValue, onGetFormData, onSaveOtherValue } = handle;
  const [visible, setVisible] = useState(false);
  const selectedData = useRef({});

  useDidMount(_ => {
    onFormatValue(name, 'toValue');
  });
  function hanldeChange(value) {
    selectedData.current = {
      ...value[0],
      _toValue: value[0][optValue],
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
        onSaveOtherValue(key, selectedData.current[key]);
      })
    }
  }

  return <>
    <Button
      onClick={switchVisible}
    >
      {echoName(value, onGetFormData, { label, editLabel }) || title}
    </Button>
    <Modal
      visible={visible}
      title={title}
      onCancel={switchVisible}
      onOk={handleSave}
    >
      <TableSelect
        value={typeof value === 'object' ? [value] : [{ [optValue]: value }]}
        onChange={hanldeChange}
        options={{
          API,
          fields,
          type: 'radio',
          value: optValue,
        }}
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
  label,
  editLabel,
}) {
  if (value) {
    if (typeof value === 'object') {
      return value[label];
    }
  }
  const formData = getFormData();
  if (formData) {
    if (typeof formData === 'object') {
      return formData[editLabel];
    }
  }
  return undefined;
}