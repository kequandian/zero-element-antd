"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SearchLayout;

require("antd/lib/row/style/css");

var _row = _interopRequireDefault(require("antd/lib/row"));

require("antd/lib/col/style/css");

var _col = _interopRequireDefault(require("antd/lib/col"));

var _react = _interopRequireDefault(require("react"));

var _layout = require("zero-element-global/lib/layout");

function SearchLayout(props) {
  var value = props.value,
      children = props.children;

  if (value && Array.isArray(value)) {
    var rst = []; // 使用 toArray 会自动 filter null

    _react["default"].Children.toArray(children).forEach(function (child) {
      var preRow = rst[rst.length - 1];

      if (preRow && preRow.items && preRow.items.length !== 0) {
        var count = preRow.items.reduce(function (pre, v, i) {
          return pre + (v.props.span || value[i]);
        }, 0);

        if (count >= 24 || isNaN(count)) {
          rst.push({
            items: []
          });
        }
      } else {
        rst.push({
          items: []
        });
      }

      rst[rst.length - 1].items.push(child);
    });

    return rst.map(function (row, i) {
      return _react["default"].createElement(_row["default"], {
        key: i,
        gutter: {
          xs: 1,
          sm: 2,
          md: 4
        }
      }, row.items.map(function (child, i) {
        var _child$props = child.props,
            props = _child$props === void 0 ? {} : _child$props;
        var span = props.span;
        return _react["default"].createElement(_col["default"], {
          key: i,
          sm: span || value[i]
        }, child);
      }));
    });
  }

  return _react["default"].createElement("div", {
    className: "ZEleA-Layout-SearchLayout"
  }, _react["default"].createElement(_row["default"], {
    gutter: {
      xs: 1,
      sm: 2,
      md: 4
    }
  }, _react["default"].Children.map(children, function (child) {
    var _child$props2 = child.props,
        props = _child$props2 === void 0 ? {} : _child$props2;
    var _props$span = props.span,
        span = _props$span === void 0 ? 24 : _props$span,
        _props$md = props.md,
        md = _props$md === void 0 ? span : _props$md,
        _props$sm = props.sm,
        sm = _props$sm === void 0 ? md * 2 > 24 ? 24 : md * 2 : _props$sm;
    return _react["default"].createElement(_col["default"], {
      sm: sm,
      md: md
    }, child);
  })));
}