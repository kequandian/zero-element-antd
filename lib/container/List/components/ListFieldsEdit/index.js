"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _lifeCycle = require("../../../utils/hooks/lifeCycle");

var _antd = require("antd");

var _PageContext = require("../../EventProxy/PageContext");

var _ListEventSet = require("../../EventProxy/List/ListEventSet");

var _DrawerContent = _interopRequireDefault(require("./DrawerContent"));

var _advancedManage = require("../../../utils/advancedManage");

var _default = function _default(props) {
  return _react["default"].createElement(_ListEventSet.Consumer, null, function (listContext) {
    return (0, _PageContext.PageConsumer)(ListFieldsEdit, (0, _objectSpread2["default"])({}, props, {
      context: (0, _objectSpread2["default"])({}, listContext)
    }));
  });
};

exports["default"] = _default;

var ListFieldsEdit = function ListFieldsEdit(props) {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      visible = _useState2[0],
      setVisibel = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      checkedList = _useState4[0],
      setCheckedList = _useState4[1];

  var pageContext = props.pageContext,
      context = props.context;
  var namespace = pageContext.namespace;
  var _context$advancedConf = context.advancedConfig,
      advancedConfig = _context$advancedConf === void 0 ? [] : _context$advancedConf,
      fieldsConfig = context.fieldsConfig,
      onChangeDisplayFields = context.onChangeDisplayFields;

  if (advancedConfig && advancedConfig.length === 0) {
    return '操作';
  }

  (0, _lifeCycle.useDidMount)(function () {
    setCheckedList((0, _advancedManage.getChecked)(namespace, fieldsConfig));
  });

  function onSwitchVisibel() {
    setVisibel(!visible);
  }

  function onSwitchChecked(data) {
    var field = data.field;
    var newCheckedList = (0, _toConsumableArray2["default"])(checkedList);
    var index = newCheckedList.findIndex(function (key) {
      return key === field;
    });

    if (index > -1) {
      newCheckedList.splice(index, 1);
    } else {
      newCheckedList.push(field);
    }

    setCheckedList(newCheckedList);
  }

  function onSaveFields() {
    (0, _advancedManage.setChecked)(namespace, checkedList);
    onChangeDisplayFields(checkedList);
    onSwitchVisibel();
  }

  var drawerProps = {
    visible: visible,
    onSwitchVisibel: onSwitchVisibel,
    advancedConfig: advancedConfig,
    checkedList: checkedList,
    onSwitchChecked: onSwitchChecked,
    onSaveFields: onSaveFields
  };
  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("span", {
    style: {
      paddingRight: '6px'
    },
    onClick: onSwitchVisibel
  }, _react["default"].createElement(_antd.Icon, {
    type: "setting"
  })), _react["default"].createElement(_DrawerContent["default"], drawerProps));
};