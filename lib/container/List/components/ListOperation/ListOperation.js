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

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _react = _interopRequireDefault(require("react"));

var _handleAction = _interopRequireDefault(require("./handleAction"));

var _checkExpected = _interopRequireDefault(require("../../../../utils/checkExpected"));

var _Model = require("zero-element/lib/Model");

var _type = _interopRequireDefault(require("./type"));

function ListOperation(props) {
  var state = props.state,
      dispatch = props.dispatch,
      index = props.index,
      record = props.record,
      operation = props.operation,
      context = props.context,
      handle = props.handle;
  var namespace = context.namespace;
  var listData = (0, _Model.getModel)(namespace).state.listData;
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

    if (item.expectedField) {
      console.warn('options 的 expectedField 即将弃用，请改为放在 expect 内');
    }

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
  return _react["default"].createElement(_popconfirm["default"], popconfirmProps, _react["default"].createElement("div", {
    className: "ZEleA-table-action"
  }, _react["default"].createElement("div", {
    className: "ZEleA-table-action-Outside"
  }, outsideList), dropdownList.length ? _react["default"].createElement(_dropdown["default"], {
    overlay: renderMemu(dropdownList),
    trigger: ['click'],
    placement: "bottomRight"
  }, _react["default"].createElement(_icon["default"], {
    style: {
      fontSize: '24px'
    },
    type: "ellipsis"
  })) : outsideList.length === 0 ? _react["default"].createElement("span", {
    className: "ZEleA-table-action-empty"
  }, "\u6682\u65E0") : null));
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push(_react["default"].createElement(_menu["default"].Item, {
      key: "99",
      disabled: true
    }, "\u6682\u65E0"));
  }

  return _react["default"].createElement(_menu["default"], null, menuItemList);
}