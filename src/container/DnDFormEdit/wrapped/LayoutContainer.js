import React from 'react';
import { DropTarget } from 'react-dnd';
import classNames from 'classnames';
import { Icon } from 'antd';

const containerSquareTarget = {
  canDrop(props, monitor) {
    const item = monitor.getItem();
    return true;
  },

  hover(props, monitor, component) {
    const clientOffset = monitor.getClientOffset();
  },

  drop(props, monitor, component) {
    if (monitor.didDrop()) {
      return;
    }
    const { config = {} } = props;
    const { parentId = 0, id } = config;

    const item = monitor.getItem();
    const { dispatch, ...rest } = item;
    dispatch({
      type: 'addLayout',
      payload: {
        ...rest,
        parentId,
        // items: [],
        id,
      }
    });
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

export default DropTarget('layout', containerSquareTarget, collect)((props) => {
  const { isOver, canDrop, connectDropTarget, isOverCurrent,
  } = props;
  const className = classNames({
    'ZEleA-DnDFormEdit-Container': true,
    'ZEleA-DnDFormEdit-hide': !canDrop,
    'ZEleA-DnDFormEdit-Container-Current': isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Available': !isOverCurrent && canDrop,
    'ZEleA-DnDFormEdit-Container-Disable': isOverCurrent && !canDrop,
  });
  return connectDropTarget(
    <div>
      <div className={className}>
        <Icon type="plus" />
      </div>
    </div>
  );
});