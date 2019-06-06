"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _layout = require("zero-element-global/lib/layout");

var _container = require("zero-element-global/lib/container");

var _listAction = require("zero-element-global/lib/listAction");

var _formItenType = require("zero-element-global/lib/formItenType");

var _Grid = _interopRequireDefault(require("./layout/Grid"));

var _BaseList = _interopRequireDefault(require("./container/List/BaseList"));

var _BaseSearch = _interopRequireDefault(require("./container/Form/BaseSearch"));

var _BaseForm = _interopRequireDefault(require("./container/Form/BaseForm"));

var _DnDFormEdit = _interopRequireDefault(require("./container/DnDFormEdit"));

var _onModal = _interopRequireDefault(require("./listAction/onModal"));

var _Input = _interopRequireDefault(require("./formItemType/Input"));

(0, _layout.set)({
  'Empty': function Empty(_ref) {
    var children = _ref.children;
    return children;
  },
  Grid: _Grid["default"]
});
(0, _container.set)({
  BaseList: _BaseList["default"],
  BaseSearch: _BaseSearch["default"],
  BaseForm: _BaseForm["default"],
  DnDFormEdit: _DnDFormEdit["default"]
});
(0, _listAction.set)({
  onModal: _onModal["default"]
});
(0, _formItenType.set)({
  input: _Input["default"]
});