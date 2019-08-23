"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var containerSquareTarget = {
  canDrop: function canDrop(props, monitor) {
    var item = monitor.getItem();
    return true;
  },
  hover: function hover(props, monitor, component) {
    var clientOffset = monitor.getClientOffset();
  },
  drop: function drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }

    var _props$config = props.config,
        config = _props$config === void 0 ? {} : _props$config;
    var _config$parentId = config.parentId,
        parentId = _config$parentId === void 0 ? 0 : _config$parentId,
        id = config.id;
    var item = monitor.getItem();
    var dispatch = item.dispatch,
        rest = (0, _objectWithoutProperties2["default"])(item, ["dispatch"]);
    dispatch({
      type: 'addElement',
      payload: _objectSpread({}, rest, {
        parentId: parentId,
        id: id,
        index: props.index,
        layoutId: props.layoutId
      })
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({
      shallow: true
    }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var _default = (0, _reactDnd.DropTarget)('element', containerSquareTarget, collect)(function (props) {
  var isOver = props.isOver,
      canDrop = props.canDrop,
      connectDropTarget = props.connectDropTarget,
      isOverCurrent = props.isOverCurrent,
      children = props.children;
  var className = (0, _classnames["default"])({
    'ZEleA-DnDFormEdit-Container': true,
    'ZEleA-DnDFormEdit-Container-Current': isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Available': !isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Disable': isOverCurrent && !canDrop // 'ZEleA-DnDFormEdit-Container-active': itemData.parentId === parentId,

  });
  return connectDropTarget(_react["default"].createElement("div", null, _react["default"].createElement("div", {
    className: className
  }, children)));
});

exports["default"] = _default;