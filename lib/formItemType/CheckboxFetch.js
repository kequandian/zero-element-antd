"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CheckboxFetch;

require("antd/lib/spin/style/css");

var _spin = _interopRequireDefault(require("antd/lib/spin"));

require("antd/lib/checkbox/style/css");

var _checkbox = _interopRequireDefault(require("antd/lib/checkbox"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireWildcard(require("react"));

var _request = require("../utils/request");

var _format = require("zero-element/lib/utils/format");

var _lifeCycle = require("zero-element/lib/utils/hooks/lifeCycle");

function CheckboxFetch(_ref) {
  var className = _ref.className,
      props = _ref.props,
      defaultValue = _ref.defaultValue,
      value = _ref.value,
      options = _ref.options,
      namespace = _ref.namespace,
      rest = (0, _objectWithoutProperties2["default"])(_ref, ["className", "props", "defaultValue", "value", "options", "namespace"]);
  var API = options.API,
      _options$dataField = options.dataField,
      dataField = _options$dataField === void 0 ? 'records' : _options$dataField,
      _options$label = options.label,
      optLabel = _options$label === void 0 ? 'label' : _options$label,
      _options$value = options.value,
      optValue = _options$value === void 0 ? 'value' : _options$value;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      optionList = _useState4[0],
      setOptionList = _useState4[1];

  (0, _lifeCycle.useDidMount)(getData);

  function getData() {
    if (API) {
      var fAPI = (0, _format.formatAPI)(API, {
        namespace: namespace
      });
      setLoading(true);
      (0, _request.query)(fAPI).then(function (data) {
        var list = Array.isArray(data) ? data : data[dataField];

        if (Array.isArray(list)) {
          setOptionList(list.map(function (item) {
            return {
              label: item[optLabel],
              value: item[optValue]
            };
          }));
        } else {
          console.warn("API ".concat(fAPI, " \u8FD4\u56DE\u7684 data \u9884\u671F\u5E94\u8BE5\u4E3A Array, \u5B9E\u9645: "), list);
        }
      })["finally"](function (_) {
        setLoading(false);
      });
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_spin["default"], {
    className: className,
    spinning: loading
  }, /*#__PURE__*/_react["default"].createElement(_checkbox["default"].Group, (0, _extends2["default"])({
    defaultValue: typeof defaultValue === 'string' ? [] : defaultValue,
    value: typeof value === 'string' ? [] : value,
    options: optionList
  }, rest, props)));
}