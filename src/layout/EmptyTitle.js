import React, { useState } from 'react';
import { Flex } from 'layout-flex';
import './index.css';

const { FlexItem } = Flex;

export default function EmptyTitle(props) {
  const { title, style, extra, children } = props;
  const [extraEle, setExtraEle] = useState(extra);

  function onSetExtraElement(ele) {
    setExtraEle(ele);
  }
  return <div style={style}>
    {title ? <div className="ZEleA-Layout-EmptyTitle">
      <Flex>
        <FlexItem flex={1}>
          {title}
        </FlexItem>
        <FlexItem>
          {extraEle}
        </FlexItem>
      </Flex>
    </div> : null}
    {React.Children.map(children, child => {
      return React.cloneElement(child, {
        onSetExtraElement,
      })
    })}
  </div>
}