function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useRef } from 'react';
import { Select, Spin } from 'antd';
import { query } from "../utils/request";
import { formatAPI } from 'zero-element/lib/utils/format';
import { useWillMount } from 'zero-element/lib/utils/hooks/lifeCycle';
const Option = Select.Option;
export default function SelectFetch(props) {
  const {
    name,
    className,
    value,
    options,
    namespace,
    onChange,
    handle = {},
    formdata = {},
    hooks = {},
    props: pProps,
    ...rest
  } = props;
  const {
    API,
    label: optLabel = 'label',
    value: optValue = 'value',
    saveData,
    effectField
  } = options;
  const {
    onFormFieldMap
  } = hooks;
  const {
    onSaveOtherValue
  } = handle;
  const [loading, setLoading] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const initRef = useRef(false);
  const effectFieldValue = formdata[effectField];
  useWillMount(_ => {
    if (effectField === undefined) {
      getData();
    }
  });
  useEffect(_ => {
    if (effectFieldValue) {
      if (initRef.current) {
        handleChange();
      }

      getData();
    }
  }, [effectFieldValue]);
  useEffect(_ => {
    handleChange(value);
  }, [optionList]);

  function getData() {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace,
        data: formdata
      });
      setLoading(true);
      query(fAPI).then(data => {
        const list = data.map(i => {
          return i;
        });

        if (Array.isArray(list)) {
          setOptionList(list);
          console.log(list);
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
        }
      }).finally(_ => {
        setLoading(false);
        initRef.current = true;
      });
    }
  }

  function handleChange(value) {
    onChange({
      target: {
        value
      }
    });
    const find = optionList.find(i => i[optValue] === value);

    if (saveData) {
      if (find) {
        Object.keys(saveData).forEach(key => {
          onSaveOtherValue(key, find[saveData[key]]);
        });
      } else {
        console.log(`未能找到 ${optValue} 为 ${value} 的数据, saveData 选项无法生效`);
      }
    }

    if (typeof onFormFieldMap === 'function') {
      onFormFieldMap(name, find).then(data => {
        const rst = {};
        Object.keys(data).forEach(key => {
          rst[key] = data[key];
        });
        onSaveOtherValue(rst);
      });
    }
  }

  return /*#__PURE__*/React.createElement(Spin, {
    className: className,
    spinning: loading
  }, /*#__PURE__*/React.createElement(Select, _extends({
    onChange: handleChange,
    value: value
  }, pProps), optionList.map(opt => /*#__PURE__*/React.createElement(Option, {
    key: opt[optValue],
    value: opt[optValue]
  }, opt[optLabel]))));
}