import React from 'react';
import { Row, Col } from 'antd';

import Render from './Layout';

export default function Grid(props) {
  const { config, dispatch } = props;
  const { value, items } = config;

  return <Row>
    {[...Array(value.length)].map((_, i) => {
      const itemCfg = items[i] || {};
      const { layout } = itemCfg;

      return <Col key={i} span={value[i]}>
        {layout ? (
          <Grid
            config={itemCfg}
            dispatch={dispatch}
          />
        ) : (
            <Render
              index={i}
              itemCfg={itemCfg}
              config={config}
              dispatch={dispatch}
            />
          )}
      </Col>
    })}
  </Row>
}