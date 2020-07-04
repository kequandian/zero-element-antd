import React, { useRef, useState, useMemo } from 'react';
import { Form } from 'antd';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { RollbackOutlined } from '@ant-design/icons';

const defaultLabelCol = {
  xs: { span: 3, },
  sm: { span: 8, },
};
const defaultWrapperCol = {
  xs: { span: 21, },
  sm: { span: 16, },
};
export default function BaseSearch(props) {
  const [form] = Form.useForm();

  const { namespace, config } = props;
  const { layout = 'Grid', fields,
    layoutConfig = {},
  } = config;
  const {
    layoutType = 'horizontal',
    value = [6, 6, 6, 6],
    collapse = 3,
    defaultExpand = fields.length > collapse ? false : null,
    buttonSpan,
  } = layoutConfig;

  const searchProps = useBaseSearch({
    namespace,
  }, config);

  const { loading, data, model, handle } = searchProps;
  const initData = useRef(data);
  const { onSearch, onSetSearchData, onClearSearch } = handle;

  const [expand, setExpand] = useState(defaultExpand);

  useMemo(recordDefaultValue, [fields]);

  useWillUnmount(_ => {
    onClearSearch();
  });

  function handleExpand() {
    setExpand(true);
  }
  function handleCollapse() {
    setExpand(false);
  }

  function recordDefaultValue() {
    fields.forEach(item => {
      const { field, value } = item;
      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
    onSetSearchData(initData.current);
  }

  function handleSubmitForm(values) {
    onSearch({
      ...data,
      ...values,
    });

  }
  function handleReset() {
    form.resetFields();
  }

  function renderFooter(validLength) {
    return <div key="searchButton" span={buttonSpan} style={{ marginLeft: '8px' }}>
      <Tooltip title="重置">
        <Button onClick={handleReset} type="link" icon={<RollbackOutlined />}></Button>
      </Tooltip>
      <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
      {validLength > collapse ? (
        <ExpandButton
          expand={expand}
          onExpand={handleExpand}
          onCollapse={handleCollapse}
        />
      ) : null}
    </div>
  }

  const renderFieldsAndButton = fields.map(field => getFormItem(field, model, {
    namespace,
    form,
  }))
    .filter(field => field);
  const validLength = renderFieldsAndButton.length;

  if (expand === false) {
    renderFieldsAndButton.splice(collapse);
  }

  renderFieldsAndButton.splice(collapse, 0, renderFooter(validLength));

  return <Spin spinning={false}>
    <Render n="SearchLayout" >
      <Form
        form={form}
        layout={layoutType}
        labelCol={defaultLabelCol}
        wrapperCol={defaultWrapperCol}
        initialValues={initData.current}
        onFinish={handleSubmitForm}
      >
        <Render n={layout} value={value} {...layoutConfig}>
          {renderFieldsAndButton}
        </Render>
      </Form>
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