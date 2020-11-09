import React from 'react';
import { Button } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';

export default function Search({ config }) {
  const { options = {} } = config;
  const { searchItems = [] } = options;
  const namespace = 'test';
  const form = { getFieldsValue: _ => { } };
  const model = {};
  const layout = 'Grid';
  const value = [6, 6, 6, 6];


  const fields = searchItems.map(field => getFormItem(field, model, {
    namespace,
    form,
    handle: {}
  }))
  return <Render n="SearchLayout" >
    <Render n={layout} value={value}>
      {React.Children.toArray(fields)}
      <Button type="primary">搜索</Button>
    </Render>
  </Render >
}