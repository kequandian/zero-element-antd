"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

var _react = _interopRequireDefault(require("react"));

var TextArea = _input["default"].TextArea;

var _default = function _default(_ref) {
  var config = _ref.config;
  var _config$options = config.options,
      options = _config$options === void 0 ? {} : _config$options;

  var _ref2 = options.base || {},
      _ref2$value = _ref2.value,
      value = _ref2$value === void 0 ? {} : _ref2$value,
      _ref2$placeholder = _ref2.placeholder,
      placeholder = _ref2$placeholder === void 0 ? {} : _ref2$placeholder,
      _ref2$minRows = _ref2.minRows,
      minRows = _ref2$minRows === void 0 ? {} : _ref2$minRows,
      _ref2$maxRows = _ref2.maxRows,
      maxRows = _ref2$maxRows === void 0 ? {} : _ref2$maxRows;

  return _react["default"].createElement(TextArea, {
    value: value.value,
    placeholder: placeholder.value,
    autoSize: {
      minRows: minRows.value,
      maxRows: maxRows.value
    }
  });
};

exports["default"] = _default;