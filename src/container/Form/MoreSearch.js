import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Form } from 'antd';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { useWillUnmount, useForceUpdate } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '../../utils/readConfig';
import { Render } from 'zero-element/lib/config/layout';
import { CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import useFormHandle from './utils/useFormHandle';
import useLongPress from '../../utils/hooks/useLongPress';
import { useDebounceFn } from 'ahooks';
import { setPageData, getPageData } from 'zero-element/lib/Model';
const SearchSvg = <svg t="1620899300269" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8750" width="14" height="14"><path d="M415.1 698.1c-156.4-0.9-283-127.6-283.7-284.1-0.4-74.9 29.1-146.8 82-199.7 52.9-53 124.8-82.6 199.6-82.3 156.4 0.9 283 127.6 283.7 284.1 0.4 74.9-29.1 146.8-82 199.7-52.8 52.9-124.7 82.6-199.6 82.3z m531.7 173.8L699.7 624.7c44.3-60.4 68-133.5 67.7-208.4-0.8-195.5-159-353.9-354.6-355.1-93.5-0.4-183.4 36.6-249.5 102.8-66.1 66.2-103 156.1-102.5 249.7 0.8 195.6 159 354 354.6 355.1 75.2 0.3 148.5-23.7 209-68.4l0.3-0.2 246.9 247c13.3 14 33.2 19.7 52 14.8 18.7-4.9 33.3-19.5 38.2-38.2 4.7-18.7-1-38.6-15-51.9z" fill="#ffffff" p-id="8751"></path></svg>
const defaultLabelCol = {
  xs: { span: 3, },
  sm: { span: 8, },
};
const defaultWrapperCol = {
  xs: { span: 24, },
  sm: { span: 16, },
};
export default function BaseSearch(props) {
  const [form] = Form.useForm();

  const { namespace, config, extraData = {}, auto = false } = props;
  const { layout = 'Grid', fields,type,
    layoutConfig = {},
  } = config;
  const {
    layoutType = 'horizontal',
    value = [24],
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

  function Footer(){
    return  <Button 
    type="primary" 
    htmlType="submit" 
    loading={loading}
    className={`_Search_ ${type} button`}
    style={{borderRadius:"0px"}}
    >
      {SearchSvg}
    </Button>

 }


  function renderFooter(validLength) {
    return <div key="searchButton" span={buttonSpan} style={{ marginLeft: '8px' }}>
      <Tooltip title="点击重置, 长按清除">
        {resetCD ?
          <Button type="link"
           icon={<CheckOutlined />} 
           /> :
          <Button
            type="link"
             icon={<RollbackOutlined />}
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
    style:type,
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
  renderFieldsAndButton.splice(collapse, 0,<></>);
  // console.log(renderFieldsAndButton,"FIELDANDBUTTON",collapse)

  return <Spin spinning={false}>
    {renderFieldsAndButton.length > 1 ? (
      <Render n="MoreSearchLayout" >
        <Form
          form={form}
          layout={layoutType}
          labelCol={defaultLabelCol}
          wrapperCol={type?null:defaultWrapperCol}
          initialValues={initData.current}
          onValuesChange={handleValuesChange}
          onFinish={handleSubmitForm}
        >
          <Render n={layout} value={value} {...layoutConfig}>
            {renderFieldsAndButton}
          </Render>
          <div style={{position: "absolute",right: "20px",bottom: "5px"}}>{type?Footer(validLength):renderFooter(validLength)}</div>
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