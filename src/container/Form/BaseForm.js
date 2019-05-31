import React, { useEffect } from 'react';
import { Form } from 'react-final-form';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { Spin } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';

import './index.css';

export default function BaseForm(props) {
  const { namespace, config } = props;
  const { layout = 'Empty', fields } = config;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, config);

  const { data, modelStatus, handle } = formProps;
  const { onGetOne, onCreateForm, onUpdateForm } = handle;

  const layoutConfig = {};

  // useEffect(_ => {
  //   onGetOne({});
  // }, []);

  function handleSubmit(data) {
  }

  return <Spin spinning={false}>
    <Form
      onSubmit={handleSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Render n={layout} {...layoutConfig}>
            {fields.map(field => getFormItem(field, modelStatus))}
            {/* {MODAL ? null : this.renderFooter()} */}
          </Render>
        </form>
      )}
    />
  </Spin>
}