"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeTag;

require("antd/lib/tag/style/css");

var _tag = _interopRequireDefault(require("antd/lib/tag"));

var _react = _interopRequireDefault(require("react"));

var _tag2 = _interopRequireDefault(require("./tag.config"));

var _status = _interopRequireDefault(require("../status/status.config"));

function valueTypeTag(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$colorMap = options.colorMap,
      colorMap = _options$colorMap === void 0 ? {} : _options$colorMap,
      _options$map = options.map,
      map = _options$map === void 0 ? {} : _options$map;
  return /*#__PURE__*/_react["default"].createElement(_tag["default"], {
    color: colorMap[text] || _tag2["default"][text] || '#108ee9'
  }, map[text] || _status["default"][text] || text);
}