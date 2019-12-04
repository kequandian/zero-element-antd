import React, { useReducer, useRef, useMemo } from 'react';
import { Form, FormSpy } from 'react-final-form';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';
import useFormHandle from './utils/useFormHandle';

export default function ChildrenForm(props) {
  const formRef = useRef({});
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { namespace, config, index, onClose, onSubmit } = props;
  const {
    API = {},
    layout = 'Empty', layoutConfig = {},
    fields,
  } = config;
  const { layoutType = 'vertical' } = layoutConfig;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
  }, config);

  const [, {
    onFormatValue,
    onSaveOtherValue,
    onGetFormData,
    bindOnChange,
    onSpyChange,
  }] = useFormHandle(namespace);

  const { loading, data, modelStatus, handle } = formProps;
  const initData = useRef(props.data || {});
  const { onGetOne } = handle;

  useMemo(recordDefaultValue, [fields]);
  useDidMount(_ => {
    if (API.getAPI) {
      onGetOne({}).then(({ code, data }) => {
        if (code === 200) {
          initData.current = data;
          forceUpdate();
        }
      });
    }
  });

  function recordDefaultValue() {
    fields.forEach(item => {
      const { field, value } = item;
      if (value !== undefined && initData.current[field] === undefined) {
        initData.current[field] = value;
      }
    });
  }
  function handleSubmitForm() {
    if (onSubmit) {
      if (index !== undefined) {
        // 一对多的编辑
        onSubmit(index, formRef.current.values);
      } else {
        // 一对多的新增
        onSubmit(formRef.current.values);
      }
      if (onClose) {
        formRef.current.onSubmit();
        onClose();
      }
      return false;
    }
  }

  function handleReset() {
    formRef.current.form.reset();
  }
  function renderFooter() {
    function onSubmit() {
      formRef.current.onSubmit();
    }
    return <div className="ant-modal-footer">
      <Button onClick={handleReset}>重置</Button>
      <Button type="primary" htmlType="submit" onClick={onSubmit}>保存</Button>
    </div>
  }

  return <Spin spinning={loading}>
    <div className={fields.length ? 'ant-modal-body' : undefined}>
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
            <Render n={layout} {...layoutConfig}>
              {fields.map(field => getFormItem(field, modelStatus, {
                namespace,
                values,
                handle: {
                  onFormatValue,
                  onSaveOtherValue,
                  onGetFormData,
                },
                bindOnChange,
              }))}
            </Render>
            <FormSpy
              subscription={{ values }}
              onChange={onSpyChange}
            />
          </form>
        }}
      />
    </div>
    {renderFooter()}
  </Spin>
}