"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var assigned = 1;
var fieldCount = 1;

var Item = function Item(obj) {
  (0, _classCallCheck2["default"])(this, Item);
  var rst = (0, _objectSpread2["default"])({}, obj); // 只有 layout 才有 tips

  if (obj.tips === undefined) {
    rst.options.base.field.value = "field_".concat(fieldCount++);
  }

  rst.id = assigned++;
  return rst;
};

var _default = Item;
exports["default"] = _default;