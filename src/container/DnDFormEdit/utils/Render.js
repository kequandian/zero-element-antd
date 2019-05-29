import React, { Fragment } from 'react';
import typeMap from '../type';
import LayoutContainer from '../wrapped/LayoutContainer';

export default function Render(props) {
  const { config } = props;
  const { type, items } = config;

  const Component = match(type);
  if (type === 'Canvas') {
    return <>
      <Component {...props}>
        {items.map(config => (
          <Fragment key={config.id}>
            <LayoutContainer config={config} />
            <Render config={config} dispatch={props.dispatch} />
          </Fragment>
        ))}
      </Component>
    </>
  }
  return <Component {...props} />
}

function match(type) {
  return typeMap[type] || (() => <div>未知的类型: {type}</div>);
}