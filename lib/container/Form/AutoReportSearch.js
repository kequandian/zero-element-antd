function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'react-final-form';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from "../../utils/readConfig";
import { Render } from 'zero-element/lib/config/layout';
import { getModel } from 'zero-element/lib/Model';
export default function AutoReportSearch(props) {
  const formRef = useRef({});
  const {
    namespace,
    config,
    extraData,
    keepData = true
  } = props;
  const {
    layout = 'Grid',
    layoutConfig = {}
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 2,
    buttonSpan
  } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'searchData',
    extraData
  }, config);
  const {
    loading,
    data,
    modelStatus,
    handle
  } = searchProps;
  const model = getModel(namespace);
  const {
    onSearch,
    onClearSearch
  } = handle;
  const {
    listData
  } = modelStatus;
  const {
    searchColumns,
    header,
    columns
  } = listData;
  const [fields, setFields] = useState([]);
  const [expand, setExpand] = useState(false);
  useEffect(_ => {
    if (Array.isArray(header) && Array.isArray(columns) && Array.isArray(searchColumns)) {
      const typeMap = {};
      header.forEach((field, i) => {
        typeMap[field] = columns[i];
      });
      setFields(searchColumns.map(field => {
        const [name, type] = field.split('-');

        if (type) {
          return {
            field: name,
            label: name,
            ...typeOptionsMap[type]
          };
        }

        return {
          field,
          label: field,
          ...typeOptionsMap[typeMap[field]]
        };
      }));
    }
  }, [searchColumns, header, columns]);
  useWillUnmount(onClearSearch);

  function handleExpand() {
    setExpand(true);
  }

  function handleCollapse() {
    setExpand(false);
  }

  function handleSubmitForm() {
    onSearch({ ...data,
      ...formRef.current.values
    });
    model.setState('searchData', formRef.current.values);
  }

  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    return /*#__PURE__*/React.createElement("div", {
      key: "searchButton",
      span: buttonSpan,
      style: {
        marginLeft: '8px'
      }
    }, /*#__PURE__*/React.createElement(Tooltip, {
      title: "\u91CD\u7F6E"
    }, /*#__PURE__*/React.createElement(Button, {
      onClick: handleReset,
      type: "link",
      icon: "rollback"
    })), /*#__PURE__*/React.createElement(Button, {
      type: "primary",
      htmlType: "submit",
      loading: loading
    }, "\u641C\u7D22"), /*#__PURE__*/React.createElement(ExpandButton, {
      expand: expand,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    }));
  }

  return /*#__PURE__*/React.createElement(Spin, {
    spinning: false
  }, /*#__PURE__*/React.createElement(Render, {
    n: "SearchLayout"
  }, /*#__PURE__*/React.createElement(Form, {
    onSubmit: handleSubmitForm,
    render: ({
      handleSubmit,
      form,
      submitting,
      pristine,
      values
    }) => {
      formRef.current = {
        form,
        values,
        onSubmit: handleSubmit
      };
      const renderFieldsAndButton = fields.map(field => getFormItem(field, modelStatus, {
        namespace,
        values
      })).filter(field => field);

      if (expand === false) {
        renderFieldsAndButton.splice(collapse);
      }

      renderFieldsAndButton.splice(collapse, 0, renderFooter());

      if (keepData) {
        model.setState('searchData', values);
      }

      return /*#__PURE__*/React.createElement("form", {
        className: `ZEleA-Form-${layoutType}`,
        onSubmit: handleSubmit
      }, /*#__PURE__*/React.createElement(Render, _extends({
        n: layout,
        value: value
      }, layoutConfig), renderFieldsAndButton));
    }
  })));
}

function ExpandButton({
  expand,
  onExpand,
  onCollapse
}) {
  if (expand === null) return null;

  if (expand) {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onCollapse
    }, "\u6536\u8D77");
  } else {
    return /*#__PURE__*/React.createElement(Button, {
      type: "link",
      onClick: onExpand
    }, "\u5C55\u5F00");
  }
}

const typeOptionsMap = {
  'D': {
    // 金钱
    type: 'number-range'
  },
  'T': {
    // 时间
    type: 'range',
    span: 12
  },
  'P': {
    // 百分比
    type: 'number-range',
    options: {
      min: 0,
      max: 100
    }
  },
  'C': {
    // 数量
    type: 'number-range'
  },
  'S': {
    // 字符串
    type: 'input'
  }
};