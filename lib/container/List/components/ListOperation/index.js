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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _zeroElement = _interopRequireDefault(require("zero-element"));

var _listAction = require("zero-element-global/lib/listAction");

var _PageContext = _interopRequireDefault(require("zero-element/lib/context/PageContext"));

var _format = require("zero-element/lib/utils/format");

var _ListOperation = _interopRequireDefault(require("./ListOperation"));

var _reducer = _interopRequireDefault(require("./reducer"));

require("../../index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var initialState = {
  confirm: false,
  modal: false,
  modalTitle: '',
  modalConfig: {},
  index: -1
};

function ListOperationWrapped(props) {
  var context = (0, _react.useContext)(_PageContext["default"]);

  var _useReducer = (0, _react.useReducer)(_reducer["default"], initialState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var index = props.index,
      namespace = props.namespace,
      _props$handle = props.handle,
      handle = _props$handle === void 0 ? {} : _props$handle,
      _props$extraData = props.extraData,
      extraData = _props$extraData === void 0 ? {} : _props$extraData;

  function onModal(cfg) {
    var options = cfg.options;
    var modalTitle = options.modalTitle,
        modalWidth = options.modalWidth,
        rest = (0, _objectWithoutProperties2["default"])(options, ["modalTitle", "modalWidth"]);
    var fTitle = (0, _format.formatAPI)(modalTitle, {
      namespace: namespace
    });
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
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
    var fTitle = (0, _format.formatAPI)(modalTitle, {
      namespace: namespace
    });
    dispatch({
      type: 'openModal',
      payload: {
        modalTitle: fTitle,
        modalWidth: modalWidth,
        modalConfig: rest,
        onSubmit: handle.onEdit,
        data: props.record,
        index: index
      }
    });
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ListOperation["default"], (0, _extends2["default"])({}, props, {
    state: state,
    dispatch: dispatch,
    context: context,
    handle: _objectSpread({}, handle, {
      onModal: onModal,
      onChildEditModal: onChildEditModal
    }, (0, _listAction.get)())
  })), /*#__PURE__*/_react["default"].createElement(_modal["default"], {
    visible: state.modal,
    title: state.modalTitle,
    width: state.modalWidth,
    destroyOnClose: true,
    onCancel: handleClose,
    bodyStyle: {
      padding: 0
    },
    footer: null
  }, /*#__PURE__*/_react["default"].createElement(_zeroElement["default"], {
    MODAL: true,
    index: index || state.index,
    namespace: context.namespace,
    config: _objectSpread({
      layout: 'Empty'
    }, state.modalConfig),
    onClose: handleClose,
    onSubmit: state.onSubmit,
    data: state.data,
    extraData: extraData
  })));
}