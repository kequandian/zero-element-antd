import { useRef, useEffect } from "react";
import { getModel } from 'zero-element/lib/Model';
import Sub from './Subscription';

const toTypeMap = {
  'html': function (value) {
    if (value && typeof value.toHTML === 'function') {
      return value.toHTML();
    }
    return value;
  },
  'raw': function (value) {
    if (value && typeof value.toRAW === 'function') {
      return value.toRAW();
    }
    return value;
  },
  'toValue': function (value) {
    if (typeof value === 'object' && value.hasOwnProperty('_toValue')) {
      return value._toValue;
    }
    return value;
  },
};

export default function useFormHandle(namespace, {
  config,
  forceInitForm,
  onGetOne,
}) {
  const formatValueRef = useRef({}); // 记录在提交之前需要格式化的字段
  const sub = useRef(new Sub());
  const model = getModel(namespace);
  const firstGetForm = useRef(true);
  const { API } = config;

  useEffect(_ => {
    if (firstGetForm.current) {
      firstGetForm.current = false;
    } else {
      if (forceInitForm !== undefined && API.getAPI) {
        onGetOne && onGetOne({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceInitForm])

  function formatValue(field, toType) {
    // 保存需要 format 的 字段与 format 的方式
    formatValueRef.current[field] = toType;
  }
  function handleGetFormData() {
    return model.getState().formData;
  }
  /**
   * 提交数据之前，格式化 value
   * 直接修改传入的 submitData
   *
   * @param {object} submitData
   */
  function handleFormatValue(submitData) {
    Object.keys(formatValueRef.current).forEach(field => {
      const type = formatValueRef.current[field];
      const value = submitData[field];
      submitData[field] = toTypeMap[type](value);
    });

  }

  return [
    {
      sub,
      model,
    },
    {
      onFormatValue: formatValue, // 字段自己标记自己是否需要在提交之前 format
      handleFormatValue, // format 全部已标记字段
      onSaveOtherValue: sub.current.changeValue.bind(sub.current),
      onGetFormData: handleGetFormData,
      bindOnChange: sub.current.recordOnChange.bind(sub.current),
      onSpyChange: sub.current.subscriptionChange.bind(sub.current),
    }
  ]
}