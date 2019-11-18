"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ModalRadioOptions;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _Input = _interopRequireDefault(require("./Input"));

var _TableField = _interopRequireDefault(require("../../render/LabelComponents/TableField"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function ModalRadioOptions(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? {} : _ref$data,
      onChange = _ref.onChange;

  function handleChange(field, e) {
    var value = e.target.value;
    onChange(_objectSpread({}, data, (0, _defineProperty2["default"])({}, field, value)));
  }

  return _react["default"].createElement("div", null, _react["default"].createElement(_Input["default"], {
    label: "\u5F15\u5BFC\u6587\u672C",
    field: "title",
    onChange: handleChange,
    value: data.title
  }), _react["default"].createElement(_Input["default"], {
    label: "\u5C55\u793A\u6587\u672C",
    field: "label",
    onChange: handleChange,
    value: data.label
  }), _react["default"].createElement(_Input["default"], {
    label: "\u7F16\u8F91\u65F6\u5C55\u793A\u6587\u672C",
    field: "editLabel",
    onChange: handleChange,
    value: data.editLabel
  }), _react["default"].createElement(_Input["default"], {
    label: "\u63D0\u4EA4\u7684\u5B57\u6BB5",
    field: "value",
    onChange: handleChange,
    value: data.value
  }), _react["default"].createElement(_Input["default"], {
    label: "API",
    field: "API",
    onChange: handleChange,
    value: data.API
  }), _react["default"].createElement(_TableField["default"], {
    field: "fields",
    label: "\u5217\u8868\u5B57\u6BB5",
    value: data.fields || [],
    handle: handleChange
  }));
}