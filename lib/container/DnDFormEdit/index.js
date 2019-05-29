"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

var _reactDndHtml5Backend = _interopRequireDefault(require("react-dnd-html5-backend"));

var _layoutFlex = require("layout-flex");

var _ComponentPanel = _interopRequireDefault(require("./ComponentPanel"));

var _EchoPanel = _interopRequireDefault(require("./EchoPanel"));

var _AttributesPanel = _interopRequireDefault(require("./AttributesPanel"));

var _Item = _interopRequireDefault(require("./utils/Item"));

var _context = _interopRequireDefault(require("./utils/context"));

var _dispatchState = _interopRequireDefault(require("./utils/dispatchState"));

var FlexItem = _layoutFlex.Flex.FlexItem;
var initState = {
  current: {},
  config: new _Item["default"]({
    id: 0,
    title: '画布',
    type: 'Canvas',
    items: []
  }),
  copyList: []
};

function DndFormEdit(props) {
  var _useReducer = (0, _react.useReducer)(_dispatchState["default"], initState),
      _useReducer2 = (0, _slicedToArray2["default"])(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1];

  var config = state.config,
      copyList = state.copyList;
  return _react["default"].createElement(_context["default"].Provider, {
    value: state
  }, _react["default"].createElement(_layoutFlex.Flex, null, _react["default"].createElement(FlexItem, {
    flex: 1
  }, _react["default"].createElement(_EchoPanel["default"], {
    config: config,
    dispatch: dispatch
  })), _react["default"].createElement(FlexItem, {
    style: {
      width: '256px'
    }
  }, _react["default"].createElement(_ComponentPanel["default"], {
    dispatch: dispatch,
    copyList: copyList
  }), _react["default"].createElement(_AttributesPanel["default"], {
    current: state.current,
    dispatch: dispatch
  }))));
}

var _default = (0, _reactDnd.DragDropContext)(_reactDndHtml5Backend["default"])(DndFormEdit);

exports["default"] = _default;