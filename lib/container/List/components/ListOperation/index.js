"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ListOperationWrapped;

require("antd/lib/modal/style/css");

var _modal = _interopRequireDefault(require("antd/lib/modal"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("antd/lib/menu/style/css");

var _menu = _interopRequireDefault(require("antd/lib/menu"));

require("antd/lib/popconfirm/style/css");

var _popconfirm = _interopRequireDefault(require("antd/lib/popconfirm"));

require("antd/lib/dropdown/style/css");

var _dropdown = _interopRequireDefault(require("antd/lib/dropdown"));

require("antd/lib/icon/style/css");

var _icon = _interopRequireDefault(require("antd/lib/icon"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireWildcard(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

var _listAction = require("zero-element-global/lib/listAction");

var _PageContext = _interopRequireDefault(require("zero-element/lib/context/PageContext"));

var _DataPool = require("zero-element/lib/DataPool");

var _format = require("zero-element/lib/utils/format");

var _checkExpected = _interopRequireDefault(require("../../../../utils/checkExpected"));

var _type = _interopRequireDefault(require("./type"));

require("../../index.css");

var initialState = {
  deleteConfirm: false,
  modal: false,
  modalTitle: '',
  modalConfig: {}
};

function reducer(state, _ref) {
  var type = _ref.type,
      payload = _ref.payload;
  var map = {
    deleteConfirm: function deleteConfirm() {
      return {
        deleteConfirm: true
      };
    },
    deleteCancel: function deleteCancel() {
      return {
        deleteConfirm: false
      };
    },
    openModal: function openModal() {
      return {
        modalTitle: payload.modalTitle,
        modalWidth: payload.modalWidth,
        modalConfig: payload.modalConfig,
        onSubmit: payload.onSubmit,
        data: payload.data,
        modal: true
      };
    },
    closeModal: function closeModal() {
      return {
        modalTitle: '',
        modalWidth: undefined,
        modalConfig: {},
        onSubmit: undefined,
        data: undefined,
        modal: false
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
      handle = props.handle,
      context = props.context;
  var API = options.API,
      saveToForm = options.saveToForm;
  var namespace = context.namespace;
  var dataPool = (0, _DataPool.getDataPool)(namespace);

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }

  type = type.replace(/( |^)[a-z]/g, function (L) {
    return L.toUpperCase();
  });
  var actionFunc = handle["on".concat(type)];

  if (typeof actionFunc === 'function') {
    dataPool.setRecord(record);

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
        options: (0, _objectSpread2["default"])({}, options, {
          API: API ? (0, _format.formatAPI)(API, {
            namespace: namespace
          }) : API
        })
      }, context);
    }
  } else {
    console.warn("\u672A\u6CE8\u518C\u7684\u4E8B\u4EF6\uFF1A on".concat(type));
  }
}

function ListOperation(props) {
  var state = props.state,
      dispatch = props.dispatch,
      index = props.index,
      record = props.record,
      operation = props.operation,
      context = props.context,
      handle = props.handle;
  var _context$records = context.records,
      records = _context$records === void 0 ? [] : _context$records;

  if (record.operation === false) {
    return null;
  }

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
    visible: state.deleteConfirm,
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

function ListOperationWrapped(props) {
  var context = (0, _react.useContext)(_PageContext["default"]);

  var _useReducer = (0, _react.useReducer)(reducer, initialState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var index = props.index,
      _props$handle = props.handle,
      handle = _props$handle === void 0 ? {} : _props$handle;

  function onModal(cfg) {
    var options = cfg.options;
    var modalTitle = options.modalTitle,
        modalWidth = options.modalWidth,
        rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle", "modalWidth"]);
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: modalTitle,
        modalWidth: modalWidth,
        modalConfig: rest
      }
    });
  }

  function handleClose() {
    dispatch({
      type: 'closeModal',
      payload: {
        modal: false
      }
    });

    if (handle.onRefresh) {
      handle.onRefresh();
    }
  }

  function onChildEditModal(cfg) {
    var options = cfg.options;
    var modalTitle = options.modalTitle,
        modalWidth = options.modalWidth,
        rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle", "modalWidth"]);
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: modalTitle,
        modalWidth: modalWidth,
        modalConfig: rest,
        onSubmit: handle.onEdit,
        data: props.record
      }
    });
  }

  return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(ListOperation, (0, _extends2["default"])({}, props, {
    state: state,
    dispatch: dispatch,
    context: context,
    handle: (0, _objectSpread2["default"])({}, handle, {
      onModal: onModal,
      onChildEditModal: onChildEditModal
    }, (0, _listAction.get)())
  })), _react["default"].createElement(_modal["default"], {
    visible: state.modal,
    title: state.modalTitle,
    width: state.modalWidth,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, _react["default"].createElement(_zeroElement["default"], {
    MODAL: true,
    index: index,
    namespace: context.namespace,
    config: state.modalConfig,
    onClose: handleClose,
    onSubmit: state.onSubmit,
    data: state.data
  })));
}