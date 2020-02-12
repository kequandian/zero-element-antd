"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _jsbarcode = _interopRequireDefault(require("jsbarcode"));

var _default = function _default(props) {
  var config = props.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;

  var _ref = options.base || {},
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? {} : _ref$value;

  var ref = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      tips = _useState2[0],
      setTips = _useState2[1];

  (0, _react.useEffect)(function (_) {
    if (ref.current) {
      try {
        (0, _jsbarcode["default"])(ref.current, value.value, {
          displayValue: false,
          width: 1,
          height: 35,
          margin: 0
        });
        setTips('');
      } catch (error) {
        setTips("\u65E0\u6548\u7684\u6761\u7801\u503C: ".concat(value.value));
      }
    }
  }, [value.value]);
  return _react["default"].createElement(_react["default"].Fragment, null, tips ? tips : null, _react["default"].createElement("div", {
    className: "barcode-box"
  }, _react["default"].createElement("svg", {
    ref: ref
  })));
};

exports["default"] = _default;