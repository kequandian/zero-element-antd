"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _layout = require("zero-element-global/lib/layout");

var _baseComponents = require("zero-element-global/lib/baseComponents");

var _BaseList = _interopRequireDefault(require("./container/List/BaseList"));

var _DnDFormEdit = _interopRequireDefault(require("./container/DnDFormEdit"));

(0, _layout.set)({
  'Empty': function Empty(_ref) {
    var children = _ref.children;
    return children;
  }
});
(0, _baseComponents.set)({
  BaseList: _BaseList["default"],
  DnDFormEdit: _DnDFormEdit["default"]
});