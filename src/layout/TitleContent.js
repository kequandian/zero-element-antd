import React, { useRef } from 'react';
import { Flex } from 'layout-flex';
import { formatAPI } from 'zero-element/lib/utils/format';
import './index.css';

const { FlexItem } = Flex;

export default function TitleContent(props) {
  const { title, style, namespace, children } = props;
  const extraEl = useRef(null);

  return <div style={style}>
    {title ? <div className="ZEleA-Layout-BaseTitle">
      <Flex>
        <FlexItem flex={1}>
          {formatAPI(title, { namespace })}
        </FlexItem>
        <FlexItem>
          <div className="ZEleA-Layout-Row" ref={extraEl}>
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