"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("antd/lib/card/style/css");

var _card = _interopRequireDefault(require("antd/lib/card"));

require("antd/lib/input/style/css");

var _input = _interopRequireDefault(require("antd/lib/input"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _default = function _default(_ref) {
  var label = _ref.label,
      value = _ref.value,
      index = _ref.index,
      onChange = _ref.onChange,
      onRemove = _ref.onRemove;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      edit = _useState2[0],
      setEdit = _useState2[1];

  function switchEdit() {
    setEdit(!edit);
  }

  return _react["default"].createElement(_card["default"], {
    size: "small",
    title: label,
    extra: _react["default"].createElement("div", null, _react["default"].createElement(_icon["default"], {
      type: "delete",
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-delete",
      onClick: onRemove.bind(null, index)
    }), _react["default"].createElement(_icon["default"], {
      type: edit ? 'up' : 'down',
      className: "ZEleA-DnDFormEdit-ItemEdit-icon ZEleA-DnDFormEdit-ItemEdit-icon-edit",
      onClick: switchEdit
    })),
    bodyStyle: {
      display: edit ? 'block' : 'none'
    }
  }, _react["default"].createElement("span", null, "\u6587\u672C: "), _react["default"].createElement(_input["default"], {
    value: label,
    onChange: onChange.bind(null, index, 'label')
  }), _react["default"].createElement("span", null, "\u503C: "), _react["default"].createElement(_input["default"], {
    value: value,
    onChange: onChange.bind(null, index, 'label')
  }));
};

exports["default"] = _default;