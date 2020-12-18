import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import useFormHandle from './utils/useFormHandle';
import useLongPress from '@/utils/hooks/useLongPress';
import { useDebounceFn } from 'ahooks';
import { setPageData, getPageData } from 'zero-element/lib/Model';

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

  const { namespace, config, extraData = {}, auto = true } = props;
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

  // const forceUpdate = useForceUpdate();
  const [resetCD, setResetCD] = useState(false);
  const searchProps = useBaseSearch({
    namespace,
  }, config);

  const { loading, data, model, handle } = searchProps;
  const initData = useRef({
    ...data,
  });
  const { onSearch, onSetSearchData, onClearSearch } = handle;

  const [expand, setExpand] = useState(defaultExpand);
  const {
    onFormatValue,
    onSaveOtherValue,
    onValuesChange,
    onExpect,
  } = useFormHandle(form, {
    namespace,
    config,
    dataPath: 'searchData',
  });

  useMemo(recordDefaultValue, [fields]);

  const { run } = useDebounceFn(_ => {
    const data = {};
    fields.forEach(field => {
      data[field.field] = undefined;
    })
    onSetSearchData(data);
    onClearSearch();
    form.setFieldsValue(data);
    setResetCD(true);
    setTimeout(() => {
      handleSubmitForm(data);
      setResetCD(false);
    }, 500);
  }, {
    wait: 300,
  });
  const onLongPress = useLongPress(run);

  const { run: autoSearch } = useDebounceFn(values => {
    handleSubmitForm(values)
  },
    {
      wait: 500,
    },
  );

  // useWillUnmount(_ => {
  //   onClearSearch();
  // });

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
        initData.current[field] = extraData[field] || value;
      }
    });
    onSetSearchData(initData.current);
  }

  function handleValuesChange(changedValues, allValues) {
    onValuesChange(changedValues, allValues);
    if (auto) {
      autoSearch(allValues);
    }
  }
  function handleSubmitForm(values) {
    onSearch({
      ...data,
      ...values,
    });

  }
  function handleReset() {
    setPageData(namespace, 'searchData', {});
    const data = {};
    fields.forEach(field => {
      data[field.field] = undefined;
    })
    onSetSearchData({});

    form.resetFields();
    form.setFieldsValue(initData.current);
    // forceUpdate();
    handleSubmitForm(data);
  }

  function renderFooter(validLength) {
    return <div key="searchButton" span={buttonSpan} style={{ marginLeft: '8px' }}>
      <Tooltip title="点击重置, 长按清除">
        {resetCD ?
          <Button type="link" icon={<CheckOutlined />} /> :
          <Button
            type="link" icon={<RollbackOutlined />}
            onClick={handleReset}
            {...onLongPress}
          ></Button>
        }
      </Tooltip>
      {auto ? null : (
        <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
      )}
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
    handle: {
      onFormatValue,
      onSaveOtherValue,
      onExpect,
    }
  }))
    .filter(field => field);
  const validLength = renderFieldsAndButton.length;

  if (expand === false) {
    renderFieldsAndButton.splice(collapse);
  }

  renderFieldsAndButton.splice(collapse, 0, renderFooter(validLength));

  return <Spin spinning={false}>
    {renderFieldsAndButton.length > 1 ? (
      <Render n="SearchLayout" >
        <Form
          form={form}
          layout={layoutType}
          labelCol={defaultLabelCol}
          wrapperCol={defaultWrapperCol}
          initialValues={initData.current}
          onValuesChange={handleValuesChange}
          onFinish={handleSubmitForm}
        >
          <Render n={layout} value={value} {...layoutConfig}>
            {renderFieldsAndButton}
          </Render>
        </Form>
      </Render>
    ) : null}
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