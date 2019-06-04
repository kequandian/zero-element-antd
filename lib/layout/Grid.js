"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Grid;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

function Grid(props) {
  var children = props.children;
  return _react["default"].createElement(_antd.Row, {
    gutter: {
      xs: 1,
      sm: 2,
      md: 4
    }
  }, _react["default"].Children.map(children, function (child) {
    var _child$props = child.props,
        props = _child$props === void 0 ? {} : _child$props;
    var _props$span = props.span,
        span = _props$span === void 0 ? 24 : _props$span,
        _props$md = props.md,
        md = _props$md === void 0 ? span : _props$md,
        _props$sm = props.sm,
        sm = _props$sm === void 0 ? md * 2 > 24 ? 24 : md * 2 : _props$sm;
    return _react["default"].createElement(_antd.Col, {
      sm: sm,
      md: md
    }, child);
  }));
}