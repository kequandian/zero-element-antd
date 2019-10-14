import React, { useReducer, useRef } from 'react';
import { Form } from 'react-final-form';
import { formatAPI } from 'zero-element/lib/utils/format';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, message } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';
import global from 'zero-element-global/lib/global';
import { getModel } from 'zero-element/lib/Model';

const toTypeMap = {
  'html': function (value) {
    return value.toHTML();
  },
  'raw': function (value) {
    return value.toRAW();
  },
};

export default function BaseForm(props) {
  const formRef = useRef({});
  const formatValueRef = useRef({}); // 记录在提交之前需要格式化的字段
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const { namespace, config, extraData = {}, onClose, onSubmit } = props;
  const { API = {}, layout = 'Empty', fields, path, layoutConfig = {} } = config;
  const { layoutType = 'vertical' } = layoutConfig;
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData,
  }, config);
  const { router } = global;

  const model = getModel(namespace);

  const { loading, data, modelStatus, handle } = formProps;
  const initData = useRef(data);
  const { onGetOne, onCreateForm, onUpdateForm, onClearForm } = handle;

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
  useWillUnmount(onClearForm);

  function handleSaveOtherValue(field, value) {
    const values = formRef.current.values;

    values[field] = value;
    formRef.current.values = values;

    model.dispatch({
      type: 'save',
      payload: {
        formData: values,
      }
    });
  }
  function formatValue(field, toType) {
    // 保存需要 format 的 字段与 format 的方式
    formatValueRef.current[field] = toType;
  }
  function handleSubmitForm() {
    const extraSubmit = {};
    fields.forEach(field => {
      if (field.type === 'hidden') {
        extraSubmit[field.field] = extraData[field.field] || field.value;
      }
    })
    const submitData = {
      ...extraSubmit,
      ...formRef.current.values,
    };

    // 提交数据之前，格式化 value
    Object.keys(formatValueRef.current).forEach(field => {
      const type = formatValueRef.current[field];
      const value = submitData[field];
      submitData[field] = toTypeMap[type](value);
    });

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }
    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData,
      }).then(handleResponse);
    }
  }
  function handleResponse(data = {}) {
    if (data.code === 200) {
      message.success('操作成功');
      if (onClose) {
        onClose();
      }
      if (path && router) {
        const fPath = formatAPI(path, {
          namespace,
        });
        router(fPath);
      }
    } else {
      message.error(`操作失败: ${data.message}`);
    }
  }

  function handleReset() {
    formRef.current.form.reset();
    model.dispatch({
      type: 'save',
      payload: {
        formData: initData.current,
      }
    });
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
          model.setState('formData', values);
          return <form
            className={`ZEleA-Form-${layoutType}`}
            onSubmit={handleSubmit}
          >
            <Render n={layout} {...layoutConfig}>
              {fields.map(field => getFormItem(field, modelStatus, {
                namespace,
                values,
                handle: {
                  onFormatValue: formatValue,
                  onSaveOtherValue: handleSaveOtherValue,
                }
              }))}
            </Render>
          </form>
        }}
      />
    </div>
    {renderFooter()}
  </Spin>
}