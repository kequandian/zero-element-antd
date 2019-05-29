"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _reactDnd = require("react-dnd");

require("../index.css");

var itemSource = {
  beginDrag: function beginDrag(props, monitor, component) {
    // 发送给 LayoutContainer 的数据
    var children = props.children,
        restProps = (0, _objectWithoutProperties2["default"])(props, ["children"]);
    return restProps;
  },
  isDragging: function isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },
  endDrag: function endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    var _monitor$getDropResul = monitor.getDropResult(),
        parentId = _monitor$getDropResul.parentId,
        insertId = _monitor$getDropResul.insertId,
        item = _monitor$getDropResul.item,
        onAddItem = _monitor$getDropResul.onAddItem;

    if (onAddItem) {}
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

var _default = (0, _reactDnd.DragSource)('layout', itemSource, collect)(function (props) {
  var isDragging = props.isDragging,
      connectDragSource = props.connectDragSource,
      children = props.children,
      restProps = (0, _objectWithoutProperties2["default"])(props, ["isDragging", "connectDragSource", "children"]);
  return connectDragSource(_react["default"].createElement("div", {
    className: "ZEle-DnDFormEdit-ComponentItem"
  }, children));
});

exports["default"] = _default;