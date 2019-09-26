import React, { useState, useEffect, useRef, useReducer, useMemo } from 'react';
import { Flex } from 'layout-flex';
import { Icon } from 'antd';
import './index.css';

const { FlexItem } = Flex;

export default function Panel({
  title,
  children,
}) {
  const [collapse, setCollapse] = useState(false);
  const [count, forcedUpdate] = useReducer(x => x + 1, 0);
  const domContent = useRef(null);
  const height = useRef(undefined);

  const [contentStyle, iconStyle] = useMemo(_ => {
    if (collapse) {
      return [
        { height: 0, padding: 0 },
        { transform: 'rotate(180deg)' },
      ]
    }
    return [
      { height: height.current, padding: undefined },
      { transform: undefined },
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collapse, count]);

  useEffect(_ => {
    if (!collapse) {
      setTimeout(_ => {
        height.current = undefined;
        forcedUpdate();
      }, 200)
    }
  }, [collapse]);

  function handleCollapse() {
    if (!collapse) {
      height.current = domContent.current.clientHeight;
    }
    setCollapse(!collapse);
  }

  return <div className="ZEleA-Panel">
    <Flex className="ZEleA-Panel-title">
      <FlexItem flex={1}>
        <div onClick={handleCollapse}>
          {title}
        </div>
      </FlexItem>
      <FlexItem className="ZEleA-Panel-icon" style={iconStyle}>
        <Icon type="down" onClick={handleCollapse} />
      </FlexItem>
    </Flex>
    <div className="ZEleA-Panel-content"
      ref={domContent}
      style={contentStyle}
    >
      {children}
    </div>
  </div>
}