import React, { useReducer, useRef, useMemo, useState, useEffect } from 'react';
import { Form, FormSpy } from 'react-final-form';
import { formatAPI } from 'zero-element/lib/utils/format';
import useBaseForm from 'zero-element/lib/helper/form/useBaseForm';
import { useDidMount, useWillUnmount } from 'zero-element/lib/utils/hooks/lifeCycle';
import { Spin, Button, message } from 'antd';
import { getFormItem } from '@/utils/readConfig';
import { Render } from 'zero-element-global/lib/layout';
import global from 'zero-element-global/lib/global';
import useFormHandle from './utils/useFormHandle';
import extraFieldType from './utils/extraFieldType';

export default function BaseForm(props) {
  const formRef = useRef({});
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const {
    MODAL, namespace, config, extraData = {},
    onClose, onSubmit, onSetExtraElement,
    loading: propsLoading,
    forceInitForm,
    footer,
    onGetFormRef,
    keepData = true,
    hooks,
  } = props;
  const {
    API = {},
    layout = 'Empty', layoutConfig = {},
    fields: fieldsCfg,
    path,
    goBack: gobackOpt = true,
    footer: footerOpt,
    requestOptions,
  } = config;
  const { layoutType = 'horizontal' } = layoutConfig; // vertical horizontal
  const formProps = useBaseForm({
    namespace,
    modelPath: 'formData',
    extraData,
  }, config);
  const { router, goBack } = global;

  const { loading, data, modelStatus, handle } = formProps;

  const initData = useRef({
    ...extraData,
    ...data,
  });
  const [{
    model,
  }, {
    onFormatValue,
    handleFormatValue,
    onSaveOtherValue,
    onGetFormData,
    bindOnChange,
    onSpyChange,
  }] = useFormHandle(namespace, {
    config,
    forceInitForm,
    keepData,
    onGetOne: handleGetData,
    formRef,
  });
  const extraFields = useRef([]);
  const [fields, setFields] = useState(fieldsCfg);
  const { onGetOne, onCreateForm, onUpdateForm, onClearForm, onCanRecyclable } = handle;
  const [destroy, setDestroy] = useState(false);
  const init = useRef(true);

  useMemo(recordDefaultValue, [fields]);
  useDidMount(_ => {
    if (API.getAPI) {
      handleGetData();
    }
    if (onSetExtraElement && goBack) {
      onSetExtraElement(<Button onClick={goBack}>返回</Button>);
    }
    if (typeof onGetFormRef === 'function') {
      onGetFormRef(formRef);
    }
  });
  useEffect(_ => {
    if (!init.current && Object.keys(data).length !== 0) {
      formRef.current.form.reset(data);
    }
    init.current = false;
  }, [data]);

  useWillUnmount(_ => {
    if (keepData && !MODAL) {
      onCanRecyclable();
    } else {
      onClearForm();
    }
  });

  function handleGetData() {
    setDestroy(true);
    onGetOne({}).then(({ code, data }) => {
      if (code === 200) {
        initData.current = data;
        const { extra } = data;
        if (extra && Array.isArray(extra.items)) {
          setExtraFields(extra.items);
        } else {
          forceUpdate();
        }
      }
    })
      .finally(_ => {
        setDestroy(false);
      })
  }
  function setExtraFields(items) {
    setFields([
      ...fields,
      ...items.map(item => {
        extraFields.current.push(item.attr);
        return {
          label: item.fieldName,
          field: item.attr,
          type: extraFieldType[item.fieldType] || 'input',
          value: item.value,
        }
      }),
    ]);
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

    handleFormatValue(submitData);


    // 修改并提交 extra 里面的数据
    extraFields.current.forEach(field => {
      const find = submitData.extra.items.find(item => item.attr === field);
      if (find) {
        find.value = submitData[field];
        delete submitData[field];
      }
    });

    if (onSubmit) {
      onSubmit(submitData);
      return false;
    }
    if (API.updateAPI) {
      onUpdateForm({
        fields: submitData,
        options: requestOptions,
      }).then(handleResponse);
    } else {
      onCreateForm({
        fields: submitData,
        options: requestOptions,
      }).then(handleResponse);
    }
  }
  function handleResponse(data = {}) {
    if (data.code === 200) {
      message.success('操作成功');
      if (onClose) {
        onClose();
      }
      if (router) {
        if (path) {
          const fPath = formatAPI(path, {
            namespace,
          });
          router(fPath);
        }
      }
      if (!MODAL && gobackOpt && goBack) {
        goBack();
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

    if (footer !== undefined || footerOpt !== undefined) {
      return footer;
    }

    return <div className="ant-modal-footer">
      <Button onClick={handleReset}>重置</Button>
      <Button type="primary" htmlType="submit" onClick={onSubmit}>保存</Button>
    </div>
  }

  return <Spin spinning={propsLoading || loading}>
    <div className={fields.length ? 'ant-modal-body' : undefined}>
      {destroy ? null : (
        <Form
          initialValues={initData.current}
          onSubmit={handleSubmitForm}
          render={({ handleSubmit, form, submitting, pristine, values }) => {
            formRef.current = {
              form,
              values,
              onSubmit: handleSubmit,
            };

            if (keepData) {
              model.setState('formData', values);
            }

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
                  hooks,
                }))}
              </Render>
              <FormSpy
                subscription={{ values }}
                onChange={onSpyChange}
              />
            </form>
          }}
        />
      )}
    </div>
    {renderFooter()}
  </Spin>
}