"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = BaseSearch;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

require("antd/lib/tooltip/style/css");

var _tooltip = _interopRequireDefault(require("antd/lib/tooltip"));

require("antd/lib/button/style/css");

var _button = _interopRequireDefault(require("antd/lib/button"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

require("antd/lib/form/style/css");

var _form = _interopRequireDefault(require("antd/lib/form"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _useBaseSearch = _interopRequireDefault(require("zero-element/lib/helper/form/useBaseSearch"));

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var _readConfig = require("../../utils/readConfig");

var _layout = require("zero-element/lib/config/layout");

var _icons = require("@ant-design/icons");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultLabelCol = {
  xs: {
    span: 3
  },
  sm: {
    span: 8
  }
};
var defaultWrapperCol = {
  xs: {
    span: 21
  },
  sm: {
    span: 16
  }
};

function BaseSearch(props) {
  var _Form$useForm = _form["default"].useForm(),
      _Form$useForm2 = (0, _slicedToArray2["default"])(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var namespace = props.namespace,
      config = props.config;
  var _config$layout = config.layout,
      layout = _config$layout === void 0 ? 'Grid' : _config$layout,
      fields = config.fields,
      _config$layoutConfig = config.layoutConfig,
      layoutConfig = _config$layoutConfig === void 0 ? {} : _config$layoutConfig;
  var _layoutConfig$layoutT = layoutConfig.layoutType,
      layoutType = _layoutConfig$layoutT === void 0 ? 'horizontal' : _layoutConfig$layoutT,
      _layoutConfig$value = layoutConfig.value,
      value = _layoutConfig$value === void 0 ? [6, 6, 6, 6] : _layoutConfig$value,
      _layoutConfig$collaps = layoutConfig.collapse,
      collapse = _layoutConfig$collaps === void 0 ? 3 : _layoutConfig$collaps,
      _layoutConfig$default = layoutConfig.defaultExpand,
      defaultExpand = _layoutConfig$default === void 0 ? fields.length > collapse ? false : null : _layoutConfig$default,
      buttonSpan = layoutConfig.buttonSpan;
  var searchProps = (0, _useBaseSearch["default"])({
    namespace: namespace
  }, config);
  var loading = searchProps.loading,
      data = searchProps.data,
      model = searchProps.model,
      handle = searchProps.handle;
  var initData = (0, _react.useRef)(data);
  var onSearch = handle.onSearch,
      onSetSearchData = handle.onSetSearchData,
      onClearSearch = handle.onClearSearch;

  var _useState = (0, _react.useState)(defaultExpand),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      expand = _useState2[0],
      setExpand = _useState2[1];

  (0, _react.useMemo)(recordDefaultValue, [fields]);
  (0, _lifeCycle.useWillUnmount)(function (_) {
    onClearSearch();
  });

  function handleExpand() {
    setExpand(true);
  }

  function handleCollapse() {
    setExpand(false);
  }

  function recordDefaultValue() {
    fields.forEach(function (item) {
      var field = item.field,
          value = item.value;

      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
    onSetSearchData(initData.current);
  }

  function handleSubmitForm(values) {
    onSearch(_objectSpread({}, data, {}, values));
  }

  function handleReset() {
    form.resetFields();
  }

  function renderFooter(validLength) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "searchButton",
      span: buttonSpan,
      style: {
        marginLeft: '8px'
      }
    }, /*#__PURE__*/_react["default"].createElement(_tooltip["default"], {
      title: "\u91CD\u7F6E"
    }, /*#__PURE__*/_react["default"].createElement(_button["default"], {
      onClick: handleReset,
      type: "link",
      icon: /*#__PURE__*/_react["default"].createElement(_icons.RollbackOutlined, null)
    })), /*#__PURE__*/_react["default"].createElement(_button["default"], {
      type: "primary",
      htmlType: "submit",
      loading: loading
    }, "\u641C\u7D22"), validLength > collapse ? /*#__PURE__*/_react["default"].createElement(ExpandButton, {
      expand: expand,
      onExpand: handleExpand,
      onCollapse: handleCollapse
    }) : null);
  }

  var renderFieldsAndButton = fields.map(function (field) {
    return (0, _readConfig.getFormItem)(field, model, {
      namespace: namespace,
      form: form
    });
  }).filter(function (field) {
    return field;
  });
  var validLength = renderFieldsAndButton.length;

  if (expand === false) {
    renderFieldsAndButton.splice(collapse);
  }

  renderFieldsAndButton.splice(collapse, 0, renderFooter(validLength));
  return /*#__PURE__*/_react["default"].createElement(_spin["default"], {
    spinning: false
  }, /*#__PURE__*/_react["default"].createElement(_layout.Render, {
    n: "SearchLayout"
  }, /*#__PURE__*/_react["default"].createElement(_form["default"], {
    form: form,
    layout: layoutType,
    labelCol: defaultLabelCol,
    wrapperCol: defaultWrapperCol,
    initialValues: initData.current,
    onFinish: handleSubmitForm
  }, /*#__PURE__*/_react["default"].createElement(_layout.Render, (0, _extends2["default"])({
    n: layout,
    value: value
  }, layoutConfig), renderFieldsAndButton))));
}

function ExpandButton(_ref) {
  var expand = _ref.expand,
      onExpand = _ref.onExpand,
      onCollapse = _ref.onCollapse;
  if (expand === null) return null;

  if (expand) {
    return /*#__PURE__*/_react["default"].createElement(_button["default"], {
      type: "link",
      onClick: onCollapse
    }, "\u6536\u8D77");
  } else {
    return /*#__PURE__*/_react["default"].createElement(_button["default"], {
      type: "link",
      onClick: onExpand
    }, "\u5C55\u5F00");
  }
}