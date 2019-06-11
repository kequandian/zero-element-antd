"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Grid;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _layout = require("zero-element-global/lib/layout");

var _antd = require("antd");

function Grid(props) {
  var layoutArea = props.layoutArea,
      value = props.value,
      children = props.children;

  if (layoutArea && Array.isArray(layoutArea)) {
    var fields = _react["default"].Children.toArray(children);

    var rst = [];
    layoutArea.forEach(function (rowLayout, i) {
      rst.push({
        key: i,
        layout: rowLayout.layout,
        value: rowLayout.value,
        items: fields.splice(0, rowLayout.length)
      });
    });
    return rst.map(function (row) {
      var layout = row.layout,
          items = row.items,
          rest = (0, _objectWithoutProperties2["default"])(row, ["layout", "items"]);
      return _react["default"].createElement(_layout.Render, (0, _extends2["default"])({
        n: layout
      }, rest), items);
    });
  }

  if (value && Array.isArray(value)) {
    var rowSize = value.length;
    var _rst = [];

    _react["default"].Children.forEach(children, function (child, i) {
      if (i % rowSize === 0) {
        _rst.push({
          items: []
        });
      }

      _rst[_rst.length - 1].items.push(child);
    });

    return _rst.map(function (row, i) {
      return _react["default"].createElement(_antd.Row, {
        key: i,
        gutter: {
          xs: 1,
          sm: 2,
          md: 4
        }
      }, row.items.map(function (child, i) {
        return _react["default"].createElement(_antd.Col, {
          key: i,
          sm: value[i]
        }, child);
      }));
    });
  }

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