import React from 'react';
import { Icon } from 'antd';

export default ({ options }, i, { index, record, records }, onAction) => {
  const { entity } = options;

  function handleDown() {
    const api = `/api/meta/patch/entity/${entity}/action/movedown/row/${record.id}/row/${records[index + 1].id}`;
    handleRequest(api);
  }
  function handleUp() {
    const api = `/api/meta/patch/entity/${entity}/action/moveup/row/${record.id}/row/${records[index - 1].id}`;
    handleRequest(api);
  }

  function handleRequest(api) {
    onAction('request', {
      method: 'post',
      API: api,
    });
  }

  return <span key={i} className="ZEleA-table-action-Sort">
    {index === 0 ?
      null
      : (<Icon
        type="arrow-up"
        title="上移"
        onClick={handleUp}
      />)}
    {index === (records.length - 1) ?
      null :
      (<Icon
        onClick={handleDown}
        type="arrow-down"
        title="下移"
      />)}
  </span>
}