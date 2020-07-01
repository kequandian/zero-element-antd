import React, { useRef, useState, useEffect } from 'react';
import { Form } from 'react-final-form';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { getModel } from 'zero-element/lib/Model';

export default function AutoReportSearch(props) {
  const formRef = useRef({});
  const { namespace, config, extraData, keepData = true } = props;
  const { layout = 'Grid',
    layoutConfig = {},
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 2,
    buttonSpan,
  } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'searchData',
    extraData,
  }, config);

  const { loading, data, modelStatus, handle } = searchProps;
  const model = getModel(namespace);
  const { onSearch, onClearSearch } = handle;
  const { listData } = modelStatus;
  const { searchColumns, header, columns } = listData;
  const [fields, setFields] = useState([]);
  const [expand, setExpand] = useState(false);

  useEffect(_ => {
    if (Array.isArray(header) && Array.isArray(columns) && Array.isArray(searchColumns)) {
      const typeMap = {};
      header.forEach((field, i) => {
        typeMap[field] = columns[i]
      });

      setFields(searchColumns.map(field => {
        const [name, type] = field.split('-');
        if (type) {
          return {
            field: name,
            label: name,
            ...typeOptionsMap[type],
          };
        }
        return {
          field,
          label: field,
          ...typeOptionsMap[typeMap[field]],
        }
      }));
    }
  }, [searchColumns, header, columns]);

  useWillUnmount(onClearSearch);

  function handleExpand() {
    setExpand(true);
  }
  function handleCollapse() {
    setExpand(false);
  }

  function handleSubmitForm() {
    onSearch({
      ...data,
      ...formRef.current.values,
    });
    model.setState('searchData', formRef.current.values);
  }
  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    return <div key="searchButton" span={buttonSpan} style={{ marginLeft: '8px' }}>
      <Tooltip title="重置">
        <Button onClick={handleReset} type="link" icon="rollback"></Button>
      </Tooltip>
      <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
      <ExpandButton
        expand={expand}
        onExpand={handleExpand}
        onCollapse={handleCollapse}
      />
    </div>
  }

  return <Spin spinning={false}>
    <Render n="SearchLayout" >
      <Form
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          formRef.current = {
            form,
            values,
            onSubmit: handleSubmit,
          };
          const renderFieldsAndButton = fields.map(field => getFormItem(field, modelStatus, {
            namespace,
            values,
          }))
            .filter(field => field);

          if (expand === false) {
            renderFieldsAndButton.splice(collapse);
          }

          renderFieldsAndButton.splice(collapse, 0, renderFooter());

          if (keepData) {
            model.setState('searchData', values);
          }

          return <form
            className={`ZEleA-Form-${layoutType}`}
            onSubmit={handleSubmit}
          >
            <Render n={layout} value={value} {...layoutConfig}>
              {renderFieldsAndButton}
            </Render>
          </form>
        }}
      />
    </Render>
  </Spin>
}

function ExpandButton({ expand, onExpand, onCollapse }) {
  if (expand === null) return null;
  if (expand) {
    return <Button type="link" onClick={onCollapse}>收起</Button>;
  } else {
    return <Button type="link" onClick={onExpand}>展开</Button>;
  }
}

const typeOptionsMap = {
  'D': { // 金钱
    type: 'number-range',
  },
  'T': { // 时间
    type: 'range',
    span: 12,
  },
  'P': { // 百分比
    type: 'number-range',
    options: {
      min: 0,
      max: 100,
    },
  },
  'C': { // 数量
    type: 'number-range',
  },
  'S': { // 字符串
    type: 'input',
  },
};