import React, { useState } from 'react';
import { Button } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';

export default function Search({ config }) {
  const { options = {} } = config;
  const { searchItems = [], config: cfg } = options;
  const { collapse } = cfg;
  const collapseValue = collapse && collapse.value;

  const namespace = 'test';
  const form = { getFieldsValue: _ => { } };
  const model = {};
  const [expand, setExpand] = useState(false);

  const layout = 'Grid';
  const value = [6, 6, 6, 6];

  function renderFooter(validLength) {
    return <>
      <Button type="primary">搜索</Button>
      {validLength > collapseValue ? (
        <ExpandButton
          expand={expand}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        />
      ) : null}
    </>
  }
  function handleExpand() {
    setExpand(true);
  }
  function handleCollapse() {
    setExpand(false);
  }

  const fields = searchItems.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {}
  }))

  const validLength = fields.length;

  if (expand === false) {
    fields.splice(collapseValue);
  }

  fields.splice(collapseValue, 0, renderFooter(validLength));

  return <Render n="SearchLayout" >
    <Render n={layout} value={value}>
      {React.Children.toArray(fields)}
    </Render>
  </Render >
}

function ExpandButton({ expand, onExpand, onCollapse }) {
  if (expand === null) return null;
  if (expand) {
    return <Button type="link" onClick={onCollapse}>收起</Button>;
  } else {
    return <Button type="link" onClick={onExpand}>展开</Button>;
  }
}