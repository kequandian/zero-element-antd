"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = valueTypeStatus;

var _status = _interopRequireDefault(require("./status.config"));

function valueTypeStatus(props) {
  var _props$options = props.options,
      options = _props$options === void 0 ? {} : _props$options,
      _props$data$text = props.data.text,
      text = _props$data$text === void 0 ? '' : _props$data$text;
  var _options$map = options.map,
      map = _options$map === void 0 ? {} : _options$map;
  return map[text] || _status["default"][text] || text;
}