"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListOperationWrapped;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _PageContext = _interopRequireDefault(require("zero-element/lib/context/PageContext"));

var _checkExpected = _interopRequireDefault(require("../../../../utils/checkExpected"));

var _type = _interopRequireDefault(require("./type"));

require("../../index.css");

var initialState = {
  visible: false
};

function reducer(state, _ref) {
  var type = _ref.type;
  var map = {
    deleteConfirm: function deleteConfirm() {
      return {
        visible: true
      };
    },
    deleteCancel: function deleteCancel() {
      return {
        visible: false
      };
    },
    defaults: function defaults() {
      console.warn("\u672A\u5B9A\u4E49\u7684\u65B9\u6CD5: ".concat(type));
      return state;
    }
  };
  return (map[type] || map['defaults'])();
}

function handleAction(type, options, props, dispatch) {
  var record = props.record,
      handle = props.handle;
  var saveToForm = options.saveToForm;

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }

  type = type.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
  var actionFunc = handle["on".concat(type)];

  if (actionFunc) {
    if (saveToForm) {
      console.warn("saveToForm TODO");
    }

    if (type === 'Delete') {
      dispatch({
        type: 'deleteConfirm'
      });
    } else {
      actionFunc({
        record: record,
        options: options,
        ACTIONTYPE: 'edit'
      });
    }
  } else {
    console.warn("\u672A\u6CE8\u518C\u7684\u4E8B\u4EF6\uFF1A on".concat(type));
  }
}

function ListOperation(props) {
  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var index = props.index,
      record = props.record,
      operation = props.operation,
      context = props.context,
      handle = props.handle;
  var _context$records = context.records,
      records = _context$records === void 0 ? [] : _context$records;

  function handleCancel() {
    dispatch({
      type: 'deleteCancel'
    });
  }

  function handleConfirm() {
    handle["onDelete"]({
      record: record
    });
    dispatch({
      type: 'deleteCancel'
    });
  }

  function onAction(action, options) {
    handleAction(action, options, props, dispatch);
  }

  var popconfirmProps = {
    title: '确定要删除该项吗？',
    visible: state.visible,
    onCancel: handleCancel,
    onConfirm: handleConfirm
  };
  var outsideList = [];
  var dropdownList = [];
  operation.forEach(function (item, i) {
    item.options = item.options || {};

    if ((0, _checkExpected["default"])(record, item.options)) {
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
  return _react["default"].createElement(_antd.Popconfirm, popconfirmProps, _react["default"].createElement("div", {
    className: "ZEle-table-action"
  }, _react["default"].createElement("div", {
    className: "ZEle-table-action-Outside"
  }, outsideList), dropdownList.length ? _react["default"].createElement(_antd.Dropdown, {
    overlay: renderMemu(dropdownList),
    trigger: ['click'],
    placement: "bottomRight"
  }, _react["default"].createElement(_antd.Icon, {
    style: {
      fontSize: '24px'
    },
    type: "ellipsis"
  })) : outsideList.length === 0 ? _react["default"].createElement("span", {
    className: "ZEle-table-action-empty"
  }, "\u6682\u65E0") : null));
}

function renderMemu(menuItemList) {
  if (menuItemList.length === 0) {
    menuItemList.push(_react["default"].createElement(_antd.Menu.Item, {
      key: "99",
      disabled: true
    }, "\u6682\u65E0"));
  }

  return _react["default"].createElement(_antd.Menu, null, menuItemList);
}

function ListOperationWrapped(props) {
  var context = (0, _react.useContext)(_PageContext["default"]);
  return _react["default"].createElement(ListOperation, (0, _extends2["default"])({}, props, {
    context: context
  }));
}