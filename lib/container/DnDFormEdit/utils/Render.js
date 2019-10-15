"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Render;

var _react = _interopRequireWildcard(require("react"));

var _type = _interopRequireDefault(require("../type"));

var _RowTool = _interopRequireDefault(require("./components/RowTool"));

function Render(props) {
  var config = props.config,
      dispatch = props.dispatch;
  var type = config.type,
      tips = config.tips,
      items = config.items,
      options = config.options;
  var Component = match(type);

  if (type === 'Canvas') {
    return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(Component, props, items.map(function (config) {
      return _react["default"].createElement(_react.Fragment, {
        key: config.id
      }, _react["default"].createElement(Render, {
        config: config,
        dispatch: dispatch
      }));
    })));
  }

  if (tips) {
    return _react["default"].createElement(_RowTool["default"], {
      dispatch: dispatch,
      config: config,
      component: _react["default"].createElement(Component, props)
    });
  }

  var base = options.base;
  return _react["default"].createElement(_react["default"].Fragment, null, base.label.value ? _react["default"].createElement("label", {
    className: "ZEleA-Form-item-label"
  }, "".concat(base.label.value, ":")) : null, _react["default"].createElement("div", {
    className: "ZEleA-Form-item-element"
  }, _react["default"].createElement(Component, props)));
}

function match(type) {
  return _type["default"][type] || function () {
    return _react["default"].createElement("div", null, "\u672A\u77E5\u7684\u7C7B\u578B: ", type);
  };
}