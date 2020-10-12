function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useEffect, useRef } from 'react';
import { Cascader, Tag } from 'antd';
import { query } from "../utils/request";
import { formatAPI } from 'zero-element/lib/utils/format';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
export default function PCD(props) {
  const {
    className,
    options,
    namespace,
    onChange,
    handle,
    formdata,
    value,
    props: restProps,
    ...rest
  } = props;
  const {
    API = '/api/pcd/list',
    dataField = 'data',
    label: optLabel = 'name',
    value: optValue = 'id',
    type = 'radio',
    format = '<p>-<c>-<d>',
    limit = [false, false, false],
    map = [{
      type: 'p',
      value: 'province'
    }, {
      type: 'c',
      value: 'city'
    }, {
      type: 'd',
      value: 'district'
    }]
  } = options;
  const {
    onSaveOtherValue
  } = handle;
  const [selectedValue, setSelectedValue] = useState([]); // 用于单选

  const [checkboxValue, setCheckboxValue] = useState([]); // 用于多选

  const [listData, setListData] = useState([]);
  const initRef = useRef(false);
  useDidMount(_ => {
    queryProvinceData();

    if (type !== 'radio' && value) {
      if (typeof value === 'string') {
        setCheckboxValue(value.split(','));
      } else if (Array.isArray(value)) {
        setCheckboxValue(value);
      }
    }
  });
  useEffect(_ => {
    if (!initRef.current && listData.length) {
      initData(listData);
    }
  }, [listData]);

  function getData(queryData) {
    if (API) {
      const fAPI = formatAPI(API, {
        namespace
      });
      return query(fAPI, queryData).then(data => {
        const list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          return Promise.resolve(list);
        } else {
          console.warn(`API ${fAPI} 返回的 data 预期应该为 Array, 实际: `, list);
          return Promise.reject();
        }
      }).finally(_ => {});
    }

    return Promise.resolve([]);
  }
  /**
   * 查询第一级的数据
   */


  function queryProvinceData() {
    const type = map[0].type;
    getData({
      type
    }).then(data => {
      const formatData = data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type,
        isLeaf: Boolean(limit && limit[1])
      }));
      setListData(formatData);
    });
  }

  function queryCityData(id) {
    const type = map[1].type;
    return getData({
      type,
      pid: id
    }).then(data => {
      return Promise.resolve(data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type,
        isLeaf: Boolean(limit && limit[2])
      })));
    });
  }

  function queryDistrictData(id) {
    const type = map[2].type;
    return getData({
      type,
      pid: id
    }).then(data => {
      return Promise.resolve(data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type
      })));
    });
  }

  function loadData(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let queryData;
    const type = map[0].type;

    if (targetOption.type === type) {
      queryData = queryCityData;
    } else {
      queryData = queryDistrictData;
    }

    queryData(targetOption.value).then(data => {
      targetOption.loading = false;
      targetOption.children = data;
      setListData([...listData]);
    });
  }

  ;

  function handleChange(value, selectedOptions) {
    if (type === 'radio') {
      setSelectedValue(value);
      const data = {};
      selectedOptions.forEach(selected => {
        const find = map.find(i => i.type === selected.type);

        if (find) {
          onSaveOtherValue(find.value, selected.label);
          data[find.type] = selected.label;
        }
      });
      const currentValue = formatAPI(format, {
        namespace,
        data: data
      });
      onChange(currentValue);
    } else {
      const map = {};
      selectedOptions.forEach(item => {
        map[item.type] = item.label;
      });
      const currentValue = formatAPI(format, {
        namespace,
        data: map
      });
      const checkboxed = [...[...checkboxValue].filter(i => i !== currentValue), currentValue];
      setCheckboxValue(checkboxed);
      onChange(checkboxed);
    }
  }

  function initData(pList) {
    const rst = [];
    findData(formdata[map[0].value], pList, rst, queryCityData).then(list => findData(formdata[map[1].value], list, rst, queryDistrictData)).then(list => findData(formdata[map[2].value], list, rst)).then(_ => {
      initRef.current = true;
      setSelectedValue(rst);
      setListData([...listData]);
    });
  }

  function findData(value, list, rst, queryData) {
    if (value) {
      const find = list.find(i => i.label === value);

      if (find) {
        rst.push(find.value);

        if (typeof queryData === 'function') {
          find.loading = true;
          return queryData(find.value).then(data => {
            find.children = data;
            find.loading = false;
            return data;
          });
        }
      }
    }

    return Promise.resolve([]);
  }

  function handleRemoveTag(tag) {
    const checkboxed = [...checkboxValue].filter(i => i !== tag);
    setCheckboxValue(checkboxed);
    onChange(checkboxed);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Cascader, _extends({
    allowClear: false
  }, restProps, {
    value: selectedValue,
    options: listData,
    loadData: loadData,
    onChange: handleChange // changeOnSelect

  })), checkboxValue.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), checkboxValue.map(tag => {
    return /*#__PURE__*/React.createElement(Tag, {
      color: "processing",
      key: tag,
      onClose: handleRemoveTag.bind(null, tag),
      closable: true
    }, tag);
  })) : null);
}