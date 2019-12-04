import React, { useRef, useState, useMemo } from 'react';
import { Form } from 'react-final-form';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseSearch(props) {
  const formRef = useRef({});
  const { namespace, config, extraData } = props;
  const { layout = 'Grid', fields,
    layoutConfig = {},
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 3,
    buttonSpan,
  } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'searchData',
    extraData,
  }, config);

  const { loading, data, modelStatus, handle } = searchProps;
  const initData = useRef(data);
  const { onSearch, onClearSearch } = handle;

  const [expand, setExpand] = useState(fields.length > collapse ? false : null);
  const [canFields, setCanFields] = useState(fields.slice(0, collapse));

  useMemo(recordDefaultValue, [fields]);
  useWillUnmount(_ => {
    onClearSearch();
  });

  function handleExpand() {
    setExpand(true);
    setCanFields(fields);
  }
  function handleCollapse() {
    setExpand(false);
    setCanFields(fields.slice(0, collapse));
  }

  function recordDefaultValue() {
    fields.forEach(item => {
      const { field, value } = item;
      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
  }

  function handleSubmitForm() {
    onSearch({
      ...data,
      ...formRef.current.values,
    });
  }
  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    return <div span={buttonSpan} style={{ marginLeft: '8px' }}>
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
    <Form
      initialValues={initData.current}
      onSubmit={handleSubmitForm}
      render={({ handleSubmit, form, submitting, pristine, values }) => {
        formRef.current = {
          form,
          values,
          onSubmit: handleSubmit,
        };
        return <form
          className={`ZEleA-Form-${layoutType}`}
          onSubmit={handleSubmit}
        >
          <Render n={layout} value={value} {...layoutConfig}>
            {canFields.map(field => getFormItem(field, modelStatus, {
              namespace,
              values,
            }))}
            {renderFooter()}
          </Render>
        </form>
      }}
    />
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