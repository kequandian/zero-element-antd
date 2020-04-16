"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/row/style/css");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style/css");

var _col = _interopRequireDefault(require("antd/lib/col"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var _Layout = _interopRequireDefault(require("./Layout"));

var _default = function _default(props) {
  var config = props.config,
      dispatch = props.dispatch;
  var value = config.value,
      items = config.items;
  return /*#__PURE__*/_react["default"].createElement(_row["default"], null, (0, _toConsumableArray2["default"])(Array(value.length)).map(function (_, i) {
    var itemCfg = items[i] || {};
    return /*#__PURE__*/_react["default"].createElement(_col["default"], {
      key: i,
      span: value[i]
    }, /*#__PURE__*/_react["default"].createElement(_Layout["default"], {
      index: i,
      itemCfg: itemCfg,
      config: config,
      dispatch: dispatch
    }));
  }));
};

exports["default"] = _default;