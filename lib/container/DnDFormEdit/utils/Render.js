"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Render;

var _react = _interopRequireWildcard(require("react"));

var _type = _interopRequireDefault(require("../type"));

var _LayoutContainer = _interopRequireDefault(require("../wrapped/LayoutContainer"));

function Render(props) {
  var config = props.config;
  var type = config.type,
      items = config.items;
  var Component = match(type);

  if (type === 'Canvas') {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Component, props, items.map(function (config) {
      return _react["default"].createElement(_react.Fragment, {
        key: config.id
      }, _react["default"].createElement(_LayoutContainer["default"], {
        config: config
      }), _react["default"].createElement(Render, {
        config: config,
        dispatch: props.dispatch
      }));
    })));
  }

  return _react["default"].createElement(Component, props);
}

function match(type) {
  return _type["default"][type] || function () {
    return _react["default"].createElement("div", null, "\u672A\u77E5\u7684\u7C7B\u578B: ", type);
  };
}