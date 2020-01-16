import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';
import _ from 'lodash';
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
    requireValid,
    pagination,
    modalWidth,
    searchFields,
    mountFetch,
  } = options;
  const { onFormatValue, onGetFormData, onSaveOtherValue } = handle;
  const [visible, setVisible] = useState(false);
  const [disabled, setDisable] = useState(null);
  const selectedData = useRef({});
  const [v, setV] = useState([{ [optValue]: value }]);

  useDidMount(_ => {
    onFormatValue(name, 'toValue');
  });
  useEffect(_ => {
    const selectedValue = typeof value === 'object' ? [value] : [{ [optValue]: value }];

    setV(selectedValue);
  }, [value])

  function handleChange(value) {
    setDisable(value);
    selectedData.current = {
      ...value[0],
      _toValue: value[0][optValue],
    };
  }
  function onOpen() {
    setVisible(true);
  }
  function onClose() {
    setVisible(false);
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
      onClick={onOpen}
    >
      {echoName(value, onGetFormData, { label, editLabel }) || title}
    </Button>
    <Modal
      destroyOnClose
      visible={visible}
      title={title}
      width={modalWidth}
      onCancel={onClose}
      onOk={handleSave}
      okButtonProps={{
        disabled: !Boolean(disabled),
      }}
    >
      <TableSelect
        value={v}
        onChange={handleChange}
        options={{
          API,
          fields,
          type: 'radio',
          value: optValue,
          requireValid,
          pagination,
          searchFields,
          mountFetch,
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
      return _.get(formData, editLabel) || value;
    }
  }
  return value;
}