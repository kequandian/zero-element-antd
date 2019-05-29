import React from 'react';
import { Row, Col, Icon } from 'antd';
import DnDContext from '../utils/context';

import Render from './Layout';

export default (props) => {
  const { config, dispatch } = props;
  const { value, items } = config;

  return <Row>
    {Array(value.length).fill(1).map((_, i) => {
      const itemCfg = items[i] || {};

      return <Col key={i} span={value[i]}>
        <Render
          index={i}
          itemCfg={itemCfg}
          config={config}
          dispatch={dispatch}
        />
      </Col>
    })}
  </Row>
}