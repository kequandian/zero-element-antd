"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SelectFetch;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

require("antd/lib/select/style/css");

var _select = _interopRequireDefault(require("antd/lib/select"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("../utils/request");

var _format = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

var Option = _select["default"].Option;

function SelectFetch(props) {
  var className = props.className,
      value = props.value,
      options = props.options,
      namespace = props.namespace,
      onChange = props.onChange,
      handle = props.handle,
      rest = (0, _objectWithoutProperties2["default"])(props, ["className", "value", "options", "namespace", "onChange", "handle"]);
  var API = options.API,
      _options$dataField = options.dataField,
      dataField = _options$dataField === void 0 ? 'records' : _options$dataField,
      _options$label = options.label,
      optLabel = _options$label === void 0 ? 'label' : _options$label,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'value' : _options$value,
      effectField = options.effectField;
  var onGetFormData = handle.onGetFormData;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      optionList = _useState4[0],
      setOptionList = _useState4[1];

  var formData = onGetFormData();
  var effectFieldValue = formData[effectField];
  (0, _lifeCycle.useWillMount)(function (_) {
    if (effectField === undefined) {
      getData();
    }
  });
  (0, _react.useEffect)(function (_) {
    if (effectFieldValue) {
      getData();
      handleChange();
    }
  }, [effectFieldValue]);

  function getData() {
    if (API) {
      var fAPI = (0, _format.formatAPI)(API, {
        namespace: namespace,
        data: formData
      });
      setLoading(true);
      (0, _request.query)(fAPI).then(function (data) {
        var list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          setOptionList(list);
        } else {
          console.warn("API ".concat(fAPI, " \u8FD4\u56DE\u7684 data \u9884\u671F\u5E94\u8BE5\u4E3A Array, \u5B9E\u9645: "), list);
        }
      })["finally"](function (_) {
        setLoading(false);
      });
    }
  }

  function handleChange(value) {
    onChange({
      target: {
        value: value
      }
    });
  }

  return _react["default"].createElement(_spin["default"], {
    className: className,
    spinning: loading
  }, _react["default"].createElement(_select["default"], (0, _extends2["default"])({
    onChange: handleChange,
    value: value
  }, rest), optionList.map(function (opt) {
    return _react["default"].createElement(Option, {
      key: opt[optValue],
      value: opt[optValue]
    }, opt[optLabel]);
  })));
}