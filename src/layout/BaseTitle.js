import React, { useRef } from 'react';
import Flex from '@/layout/Flex';
import './index.css';

const { FlexItem } = Flex;

export default function BaseTitle(props) {
  const { title, style, extra, children } = props;
  const extraEl = useRef(null);

  return <div style={style}>
    {title ? <div className="ZEleA-Layout-BaseTitle">
      <Flex>
        <FlexItem flex={1}>
          {title}
        </FlexItem>
        <FlexItem>
          <div className="ZEleA-Layout-Row" ref={extraEl}>
          </div>
        </FlexItem>
      </Flex>
    </div> : null}
    {React.Children.map(children, child => {
      return React.cloneElement(child, {
        extraEl,
      })
    })}
  </div>
}