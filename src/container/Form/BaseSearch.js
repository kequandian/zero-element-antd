import React, { useRef } from 'react';
import { Form } from 'react-final-form';
import useBaseSearch from 'zero-element/lib/helper/form/useBaseSearch';
import { Spin, Button, Tooltip } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseSearch(props) {
  const formRef = useRef({});
  const symbolRef = useRef(Symbol('BaseSearch'));
  const { namespace, config } = props;
  const { layout = 'Grid', fields, layoutConfig = { value: [8, 8, 8] } } = config;
  const { layoutType = 'horizontal' } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'formData',
    symbol: symbolRef.current,
  }, config);

  const { data, modelStatus, handle } = searchProps;
  const { onSearch } = handle;

  function handleSubmitForm() {
    onSearch({
      queryData: {
        ...formRef.current.values,
        ...data,
      },
    });
  }
  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    return <div style={{marginLeft: '8px'}}>
      <Tooltip title="重置">
        <Button onClick={handleReset} type="link" icon="rollback"></Button>
      </Tooltip>
      <Button type="primary" htmlType="submit">搜索</Button>
    </div>
  }

  return <Spin spinning={false}>
    <div className="ant-modal-body">
      <Form
        initialValues={data}
        onSubmit={handleSubmitForm}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          formRef.current = {
            form,
            values,
            onSubmit: handleSubmit,
          };
          return <form
            className={`ZEle-Form-${layoutType}`}
            onSubmit={handleSubmit}
          >
            <Render n={layout} {...layoutConfig}>
              {fields.map(field => getFormItem(field, modelStatus))}
              {renderFooter()}
            </Render>
          </form>
        }}
      />
    </div>
  </Spin>
}