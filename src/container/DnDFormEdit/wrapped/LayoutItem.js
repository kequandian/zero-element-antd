import React from 'react';
import { DragSource } from 'react-dnd';
import '../index.css';

const itemSource = {
  beginDrag(props, monitor, component) {
    // 发送给 LayoutContainer 的数据
    const { children, ...restProps } = props;
    return restProps;
  },
  isDragging(props, monitor) {
    return monitor.getItem().id === props.id;
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }
    const { parentId, insertId, item, onAddItem } = monitor.getDropResult();
    if (onAddItem) {
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

export default DragSource('layout', itemSource, collect)((props) => {
  const { isDragging, connectDragSource,
    children,
    ...restProps
  } = props;

  return connectDragSource(<div className="ZEle-DnDFormEdit-ComponentItem">{children}
  </div>);
});