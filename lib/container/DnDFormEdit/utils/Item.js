"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setInitId = setInitId;
exports.fieldCount = exports.assigned = exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var assigned = 1;
exports.assigned = assigned;
var fieldCount = 1;
exports.fieldCount = fieldCount;

var Item = function Item(obj) {
  var _assigned;

  (0, _classCallCheck2["default"])(this, Item);
  var rst = (0, _objectSpread2["default"])({}, obj); // 只有 layout 才有 tips

  if (obj.tips === undefined) {
    var _fieldCount;

    rst.options.base.field.value = "field_".concat((_fieldCount = +fieldCount, exports.fieldCount = fieldCount = _fieldCount + 1, _fieldCount));
  }

  rst.id = (_assigned = +assigned, exports.assigned = assigned = _assigned + 1, _assigned);
  return rst;
};

function setInitId() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  exports.assigned = assigned = id;
  exports.fieldCount = fieldCount = count;
}

var _default = Item;
exports["default"] = _default;