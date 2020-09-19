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
    ...rest
  } = props;
  const {
    API = '/api/pcd/list',
    dataField = 'data',
    label: optLabel = 'name',
    value: optValue = 'id',
    type = 'radio',
    checkboxTemplate = '<p>-<c>-<d>',
    limit = {
      p: false,
      c: false,
      d: false
    },
    map = {
      p: 'province',
      c: 'city',
      d: 'district'
    }
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

  function queryProvinceData() {
    getData({}).then(data => {
      const formatData = data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type: 'p',
        isLeaf: Boolean(limit && limit.c)
      }));
      setListData(formatData);
    });
  }

  function queryCityData(id) {
    return getData({
      type: 'c',
      pid: id
    }).then(data => {
      return Promise.resolve(data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type: 'c',
        isLeaf: Boolean(limit && limit.d)
      })));
    });
  }

  function queryDistrictData(id) {
    return getData({
      type: 'd',
      pid: id
    }).then(data => {
      return Promise.resolve(data.map(i => ({
        label: i[optLabel],
        value: i[optValue],
        type: 'd'
      })));
    });
  }

  function loadData(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let queryData;

    if (targetOption.type === 'p') {
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
      selectedOptions.forEach(selected => {
        onSaveOtherValue(map[selected.type], selected.label);
      });
    } else {
      const map = {};
      selectedOptions.forEach(item => {
        map[item.type] = item.label;
      });
      const currentValue = formatAPI(checkboxTemplate, {
        namespace,
        data: map
      });
      const checkboxed = [[...checkboxValue].filter(i => i !== currentValue), currentValue];
      setCheckboxValue(checkboxed);
      onChange(checkboxed);
    }
  }

  function initData(pList) {
    const rst = [];
    findData(formdata[map.p], pList, rst, queryCityData).then(list => findData(formdata[map.c], list, rst, queryDistrictData)).then(list => findData(formdata[map.d], list, rst)).then(_ => {
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

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Cascader, {
    allowClear: false,
    value: selectedValue,
    options: listData,
    loadData: loadData,
    onChange: handleChange // changeOnSelect

  }), checkboxValue.length ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), checkboxValue.map(tag => {
    return /*#__PURE__*/React.createElement(Tag, {
      color: "processing",
      key: tag,
      onClose: handleRemoveTag.bind(null, tag),
      closable: true
    }, tag);
  })) : null);
}