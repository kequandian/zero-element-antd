import React, { useRef } from 'react';
import { Flex } from 'layout-flex';
import './index.css';

const { FlexItem } = Flex;

export default function BaseTitle(props) {
  const { title, style, children } = props;
  const extraEl = useRef(null);

  return <div style={style}>
    {title ? <div className="ZEleA-Layout-BaseTitle">
      <Flex>
        <FlexItem flex={1}>
          {title}
        </FlexItem>
        <FlexItem>
          <div ref={extraEl}>
          </div>
        </FlexItem>
      </Flex>
    </div> : null}
    <div style={style} className="ZEleA-Layout-Content">
      {React.Children.map(children, child => {
        return React.cloneElement(child, {
          extraEl,
        })
      })}
    </div>
  </div>
}