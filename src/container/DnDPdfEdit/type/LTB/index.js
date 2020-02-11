import React from 'react';

import Render from '../Layout';

import './index.css';

/** 
 * 左 单独一列，上下 作为一列 的布局
 */
export default (props) => {
  const { config, dispatch } = props;
  const { value, items } = config;

  return <div className="ZEleA-Layout-table">
    <div className="ZEleA-Layout-table-row">
      <div style={{ width: value[0] }} className="ZEleA-Layout-table-cell" >
        <Render
          index={0}
          itemCfg={items[0]}
          config={config}
          dispatch={dispatch}
        />
      </div>
      <div style={{ width: value[1] }} className="ZEleA-Layout-table-cell">
        <Render
          index={1}
          itemCfg={items[1]}
          config={config}
          dispatch={dispatch}
        />
        <Render
          index={2}
          itemCfg={items[2]}
          config={config}
          dispatch={dispatch}
        />
      </div>
    </div>
  </div>
}