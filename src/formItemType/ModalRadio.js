import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'antd';
import _ from 'lodash';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import TableSelect from './TableSelect';
import { getPageData, removeModel } from 'zero-element/lib/Model';

export default function ModalRadio(props) {
  const {
    name, value,
    namespace, options = {},
    props: p,
    onChange,
    handle,
    hooks = {},
    ...rest
  } = props;
  const { onFormFieldMap } = hooks;

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
    defaultExpand,
    auto, // 自动触发搜索
  } = options;
  const { onFormatValue, onSaveOtherValue } = handle;
  const [visible, setVisible] = useState(false);
  const [disabled, setDisable] = useState(null);
  const selectedData = useRef({});
  const [v, setV] = useState([{ [optValue]: value }]);
  const formData = getPageData(namespace).formData;

  useDidMount(_ => {
    onFormatValue(name, 'toValue');
  });
  useEffect(_ => {
    const selectedValue = typeof value === 'object' ? [value] : [{ [optValue]: value }];

    setV(selectedValue);
  }, [value]);
  useWillUnmount(_ => {
    removeModel(`${namespace}_${name}_ModalRadio`);
  });

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
  function onClear() {
    setDisable(null);
    selectedData.current = {
      _toValue: null,
    };
    setV([]);
    handleSave();
    onChange(undefined);
    // setVisible(false);
  }
  function handleSave() {
    onChange(selectedData.current);
    setVisible(false);

    if (saveData) {
      Object.keys(saveData).forEach(key => {
        onSaveOtherValue(key, selectedData.current[saveData[key]]);
      });
    }

    if (typeof onFormFieldMap === 'function') {
      onFormFieldMap(name, selectedData.current)
        .then(data => {
          Object.keys(data).forEach(key => {
            onSaveOtherValue(key, data[key]);
          });
        })
    }
  }

  return <>
    <Button
      onClick={onOpen}
    >
      {echoName(value, formData, { label, editLabel }) || title}
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
      cancelText="清空选择"
      cancelButtonProps={{
        onClick: onClear,
      }}
    >
      <TableSelect
        value={v}
        onChange={handleChange}
        namespace={`${namespace}_${name}_ModalRadio`}
        extraData={formData}
        auto={auto}
        options={{
          API,
          fields,
          type: 'radio',
          value: optValue,
          requireValid,
          pagination,
          searchFields,
          mountFetch,
          defaultExpand,
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
 * @param {Objrct} formdata
 * @param {object} {
 *   label,
 *   editLabel,
 * }
 * @returns
 */
function echoName(value, formdata, {
  label,
  editLabel,
}) {

  if (value) {
    if (typeof value === 'object') {
      return value[label];
    }
  }
  if (formdata) {
    if (typeof formdata === 'object') {
      return _.get(formdata, editLabel) || value;
    }
  }
  return value;
}