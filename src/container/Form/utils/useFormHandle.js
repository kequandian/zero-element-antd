import { useRef, useEffect } from "react";

const toTypeMap = {
  'html': function (value) {
    if (value && typeof value === 'object') {
      const { current } = value;
      if (typeof current.toHTML === 'function')
        return current.toHTML();
    }
    return value;
  },
  'raw': function (value) {
    if (value && typeof value === 'object') {
      const { current } = value;
      if (typeof current.toRAW === 'function')
        return current.toRAW();
    }
    return value;
  },
  'toValue': function (value) {
    if (typeof value === 'object' && value.hasOwnProperty('_toValue')) {
      return value._toValue;
    }
    return value;
  },
  'map': function (value, map) {
    if (typeof value === 'object' && typeof map === 'object') {
      if (Array.isArray(value)) {
        return value.map(item => mapObject(item, map))
      } else {
        return mapObject(value, map);
      }
    }
    return value;
  },
  'JSONString': function (value) {
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
  }
};

function mapObject(obj, map) {
  const entries = Object.entries(map);
  Object.keys(obj).forEach(key => {
    const find = entries.find(arr => arr[1] === key)
    if (find) {
      obj[find[0]] = obj[find[1]];
      delete obj[find[1]];
    }
  });
  return obj;
}

export default function useFormHandle(form, {
  config,
  forceInitForm,
  onGetOne,
}) {
  const formatValueRef = useRef({}); // 记录在提交之前需要格式化的字段
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

  function formatValue(field, toType, opt) {
    // 保存需要 format 的 字段与 format 的方式
    if (opt) {
      formatValueRef.current[field] = {
        type: toType,
        options: opt,
      };
    } else {
      formatValueRef.current[field] = toType;
    }
  }
  function handleGetFormData() {
    return form.getFieldsValue();
  }
  /**
   * 提交数据之前，格式化 value
   * 直接修改传入的 submitData
   *
   * @param {object} submitData
   */
  function handleFormatValue(submitData) {
    Object.keys(formatValueRef.current).forEach(field => {
      const typeRecord = formatValueRef.current[field];
      const type = typeRecord.type || typeRecord;
      const value = submitData[field];
      submitData[field] = toTypeMap[type](value, typeRecord.options);
    });

  }

  function handleSaveData(key, value) {
    form.setFieldsValue(key, value);
  }

  return {
    onFormatValue: formatValue, // 字段自己标记自己是否需要在提交之前 format
    handleFormatValue, // format 全部已标记字段
    onSaveOtherValue: handleSaveData,
    onGetFormData: handleGetFormData, // 获取 model 里面的 form data
  }
}