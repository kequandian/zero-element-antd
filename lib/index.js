"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _Load = _interopRequireDefault(require("./utils/Load"));

var _layout = require("zero-element-global/lib/layout");

var _container = require("zero-element-global/lib/container");

var _listAction = require("zero-element-global/lib/listAction");

var _formItemType = require("zero-element-global/lib/formItemType");

var _actionItemType = require("zero-element-global/lib/actionItemType");

var _onRequest = _interopRequireDefault(require("./listAction/onRequest"));

(0, _layout.set)({
  'Empty': function Empty(_ref) {
    var children = _ref.children;
    return children;
  },
  Grid: (0, _Load["default"])('layout/Grid'),
  Content: (0, _Load["default"])('layout/Content')
});
(0, _container.set)({
  BaseList: (0, _Load["default"])('container/List/BaseList'),
  BaseChildren: (0, _Load["default"])('container/List/BaseChildren'),
  BaseSearch: (0, _Load["default"])('container/Form/BaseSearch'),
  BaseForm: (0, _Load["default"])('container/Form/BaseForm'),
  ChildrenForm: (0, _Load["default"])('container/Form/ChildrenForm'),
  DnDFormEdit: (0, _Load["default"])('container/DnDFormEdit')
});
(0, _listAction.set)({
  'onRequest': _onRequest["default"]
});
(0, _formItemType.set)({
  plain: (0, _Load["default"])('formItemType/Plain'),
  input: (0, _Load["default"])('formItemType/Input'),
  radio: (0, _Load["default"])('formItemType/Radio'),
  select: (0, _Load["default"])('formItemType/Select'),
  checkbox: (0, _Load["default"])('formItemType/Checkbox'),
  date: (0, _Load["default"])('formItemType/Date/date'),
  week: (0, _Load["default"])('formItemType/Date/week'),
  month: (0, _Load["default"])('formItemType/Date/month'),
  range: (0, _Load["default"])('formItemType/Date/range'),
  'select-fetch': (0, _Load["default"])('formItemType/SelectFetch')
});
(0, _actionItemType.set)({
  modal: (0, _Load["default"])('actionItemType/Modal'),
  'children-modal': (0, _Load["default"])('actionItemType/ChildrenModal')
});