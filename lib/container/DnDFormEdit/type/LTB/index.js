"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _Layout = _interopRequireDefault(require("../Layout"));

require("./index.css");

/** 
 * 左 单独一列，上下 作为一列 的布局
 */
var _default = function _default(props) {
  var config = props.config,
      dispatch = props.dispatch;
  var value = config.value,
      items = config.items;
  return _react["default"].createElement("div", {
    className: "ZEle-Layout-table"
  }, _react["default"].createElement("div", {
    className: "ZEle-Layout-table-row"
  }, _react["default"].createElement("div", {
    style: {
      width: value[0]
    },
    className: "ZEle-Layout-table-cell"
  }, _react["default"].createElement(_Layout["default"], {
    index: 0,
    itemCfg: items[0],
    config: config,
    dispatch: dispatch
  })), _react["default"].createElement("div", {
    style: {
      width: value[1]
    },
    className: "ZEle-Layout-table-cell"
  }, _react["default"].createElement(_Layout["default"], {
    index: 1,
    itemCfg: items[1],
    config: config,
    dispatch: dispatch
  }), _react["default"].createElement(_Layout["default"], {
    index: 2,
    itemCfg: items[2],
    config: config,
    dispatch: dispatch
  }))));
};

exports["default"] = _default;