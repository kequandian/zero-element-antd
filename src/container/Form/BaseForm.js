import React, { useEffect, useRef } from 'react';
import { Form } from 'react-final-form';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { Spin, Button, message } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';

export default function BaseForm(props) {
  const formRef = useRef({});
  const symbolRef = useRef(Symbol());
  const { namespace, config, onClose } = props;
  const { API = {}, layout = 'Empty', fields } = config;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    symbol: symbolRef.current,
  }, config);

  const { data, modelStatus, handle } = formProps;
  const { onGetOne, onCreateForm, onUpdateForm } = handle;

  const layoutConfig = {};

  useEffect(_ => {
    if (API.getAPI) {
      onGetOne({});
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if(meta.error) {
      ;
    }
    if (API.updateAPI) {
      onUpdateForm({
        fields: formRef.current.values,
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: formRef.current.values,
      }).then(handleResponse);
    }
  }
  function handleResponse(data = {}) {
    if (data.code === 200) {
      message.success('操作成功');
      if (onClose) {
        onClose();
      }
    } else {
      message.error(`操作失败: ${data.message}`);
    }
  }

  function handleReset() {
    formRef.current.form.reset();
  }
  function renderFooter() {
    const { onSubmit } = formRef.current;
    return <div className="ant-modal-footer">
      <Button onClick={handleReset}>重置</Button>
      <Button type="primary" htmlType="submit" onClick={onSubmit}>保存</Button>
    </div>
  }

  return <Spin spinning={false}>
    <div className="ant-modal-body">
      <Form
        initialValues={data}
        onSubmit={handleSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          formRef.current = {
            form,
            values,
            onSubmit: handleSubmit,
          };
          return <form onSubmit={handleSubmit}>
            <Render n={layout} {...layoutConfig}>
              {fields.map(field => getFormItem(field, modelStatus))}
            </Render>
          </form>
        }}
      />
    </div>
    {renderFooter()}
  </Spin>
}