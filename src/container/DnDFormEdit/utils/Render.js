import React, { Fragment } from 'react';
import typeMap from '../type';
import RowTool from './components/RowTool';

export default function Render(props) {
  const { config, dispatch } = props;
  const { type, tips, items, options } = config;

  const Component = match(type);
  if (type === 'Canvas') {
    return <>
      <Component {...props}>
        {items.map(config => (
          <Fragment key={config.id}>
            <Render config={config} dispatch={dispatch} />
          </Fragment>
        ))}
      </Component>
    </>
  }
  if (tips) {
    return <RowTool
      dispatch={dispatch}
      config={config}
      component={<Component {...props} />}
    />;
  }
  const { base } = options;
  return <>
    {base.label.value ? (
      <label className="ZEleA-Form-item-label">
        {`${base.label.value}:`}
      </label>
    ) : null}
    <div className="ZEleA-Form-item-element">
      <Component {...props} />
    </div>
  </>
}

function match(type) {
  return typeMap[type] || (() => <div>未知的类型: {type}</div>);
}