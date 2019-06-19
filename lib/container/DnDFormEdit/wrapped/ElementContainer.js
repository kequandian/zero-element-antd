"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

var _classnames = _interopRequireDefault(require("classnames"));

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
      payload: (0, _objectSpread2["default"])({}, rest, {
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