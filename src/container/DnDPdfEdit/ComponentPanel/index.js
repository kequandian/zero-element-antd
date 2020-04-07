import React from 'react';
import { Drawer } from 'antd';
import RightClick from './components/RightClick';
// import GlobalStyle from './components/GlobalStyle';
import LayoutType from '../compoments/LayoutType';
import ElementType from '../compoments/ElementType';

import layoutList from './layout.config';
import elementList from './element.config';

import '../index.css';

function Render({ cfg, dispatch }) {
  const { title, type, options } = cfg;
  if (options) {
    return <ElementType
      title={title}
      type={type}
      options={JSON.parse(JSON.stringify(options))}
      dispatch={dispatch}
    />
  }
  return <LayoutType
    {...cfg}
    dispatch={dispatch}
  />
}

export default ({ layoutType, dispatch, copyList }) => {
  return <Drawer
    visible={true}
    mask={false}
    closable={false}
  >
    {/* <GlobalStyle
      layoutType={layoutType}
      dispatch={dispatch}
    /> */}
    <div className="ZEleA-DnDFormEdit-title">布局组件</div>
    {layoutList.map((cfg, i) => {
      return <Render
        key={i}
        cfg={cfg}
        dispatch={dispatch}
      />
    })}
    <div className="ZEleA-DnDFormEdit-title">基本组件</div>
    {elementList.map((cfg, i) => {
      return <Render
        key={i}
        cfg={cfg}
        dispatch={dispatch}
      />
    })}
    {copyList.length ? (
      <>
        <div className="ZEleA-DnDFormEdit-title">复制组件</div>
        {copyList.map((cfg, i) => {
          return <RightClick key={i}
            dispatch={dispatch}
            data={cfg}
          >
            <Render
              cfg={cfg}
              dispatch={dispatch}
            />
          </RightClick>
        })}
      </>
    ) : null}
  </Drawer>
}