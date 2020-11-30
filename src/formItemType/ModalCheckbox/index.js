import React, { useState, useRef } from 'react';
import { Modal, Button } from 'antd';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import TableCheckbox from './TableCheckbox';
import { getPageData } from 'zero-element/lib/Model';

export default function ModalCheckbox(props) {
  const {
    name, value,
    namespace, options = {},
    props: p,
    onChange,
    handle,
    formdata,
    ...rest
  } = props;
  const { formData } = getPageData(namespace);

  const {
    title = '选择数据',
    modalWidth,
    label = 'name', editLabel = label,
    field = name,
    value: optValue = 'id',
    API,
    fields = [],
    saveData,
    requireValid,
    pagination,
  } = options;
  const { onFormatValue, onSaveOtherValue } = handle;
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
      {echoName(value, formData, { field, label, editLabel }) || title}
    </Button>
    <Modal
      destroyOnClose
      visible={visible}
      title={title}
      width={modalWidth}
      onCancel={switchVisible}
      onOk={handleSave}
    >
      <TableCheckbox
        namespace={`${namespace}_${name}_ModalCheckbox`}
        value={value}
        field={field}
        optValue={optValue}
        onChange={handleChange}
        formData={formdata}

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
 * @param {object} formData
 * @param {object} {
 *   label,
 *   editLabel,
 * }
 * @returns
 */
function echoName(value, formData, {
  field,
  label,
  editLabel,
}) {

  if (formData) {
    if (typeof formData === 'object') {
      if (Array.isArray(formData[editLabel])) {
        return formData[editLabel].map(item => item[label]).join(', ');
      }
      if (Array.isArray(formData[field])) {
        return formData[field].map(item => item[editLabel]).join(', ');
      }
    }
  }

  if (value) {
    if (Array.isArray(value.value)) {
      return value.value.map(value => value[label]).join(', ');
    }
  }

  return undefined;
}
