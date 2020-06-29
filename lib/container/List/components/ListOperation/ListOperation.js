"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListOperation;

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/popconfirm/style/css");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

var _react = _interopRequireDefault(require("react"));

var _icons = require("@ant-design/icons");

var _handleAction = _interopRequireDefault(require("./handleAction"));

var _checkExpected = _interopRequireDefault(require("../../../../utils/checkExpected"));

var _Model = require("zero-element/lib/Model");

var _type = _interopRequireDefault(require("./type"));

function ListOperation(props) {
  var state = props.state,
      model = props.model,
      dispatch = props.dispatch,
      index = props.index,
      record = props.record,
      operation = props.operation,
      handle = props.handle;

  var _getModel = (0, _Model.getModel)(model.namespace),
      listData = _getModel.listData;

  var records = listData.records;

  if (record.operation === false) {
    return null;
  }

  function handleCancel() {
    dispatch({
      type: 'closeConfirm'
    });

    if (handle.onClickOperation) {
      handle.onClickOperation({});
    }
  }

  function handleConfirm() {
    if (typeof state.action === 'function') {
      state.action();
    }

    dispatch({
      type: 'closeConfirm'
    });
  }

  function onAction(action, options) {
    (0, _handleAction["default"])(action, options, props, dispatch);
  }

  var popconfirmProps = {
    title: state.title,
    visible: state.confirm,
    onCancel: handleCancel,
    onConfirm: handleConfirm
  };
  var outsideList = [];
  var dropdownList = [];
  operation.forEach(function (item, i) {
    item.options = item.options || {};

    if ((0, _checkExpected["default"])(record, item.expect || item.options)) {
      if (item.options.outside) {
        outsideList.push(_type["default"]['outside'](item, i, {
          index: index,
          record: record,
          records: records
        }, onAction));
      } else {
        if (_type["default"][item.action]) {
          outsideList.push(_type["default"][item.action](item, i, {
            index: index,
            record: record,
            records: records
          }, onAction));
        } else {
          dropdownList.push(_type["default"]['dropdown'](item, i, {
            index: index,
            record: record,
            records: records
          }, onAction));
        }
      }
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_popconfirm["default"], popconfirmProps, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-table-action"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "ZEleA-table-action-Outside"
  }, outsideList), dropdownList.length ? /*#__PURE__*/_react["default"].createElement(_dropdown["default"], {
    overlay: renderMemu(dropdownList),
    trigger: ['click'],
    placement: "bottomRight"
  }, /*#__PURE__*/_react["default"].createElement(_icons.EllipsisOutlined, {
    style: {
      fontSize: '24px'
    }
  })) : outsideList.length === 0 ? /*#__PURE__*/_react["default"].createElement("span", {
    className: "ZEleA-table-action-empty"
  }, "\u6682\u65E0") : null));
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push( /*#__PURE__*/_react["default"].createElement(_menu["default"].Item, {
      key: "99",
      disabled: true
    }, "\u6682\u65E0"));
  }

  return /*#__PURE__*/_react["default"].createElement(_menu["default"], null, menuItemList);
}