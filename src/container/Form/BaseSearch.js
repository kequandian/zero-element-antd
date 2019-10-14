import React, { useRef } from 'react';
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
    layoutConfig = {}
  } = config;
  const { layoutType = 'horizontal' } = layoutConfig;
  const searchProps = useBaseSearch({
    namespace,
    modelPath: 'searchData',
    extraData,
  }, config);

  const { loading, data, modelStatus, handle } = searchProps;
  const { onSearch, onClearSearch } = handle;

  useWillUnmount(onClearSearch);

  function handleSubmitForm() {
    onSearch({
      queryData: {
        ...data,
        ...formRef.current.values,
      },
    });
  }
  function handleReset() {
    formRef.current.form.reset();
  }

  function renderFooter() {
    return <div style={{ marginLeft: '8px' }}>
      <Tooltip title="重置">
        <Button onClick={handleReset} type="link" icon="rollback"></Button>
      </Tooltip>
      <Button type="primary" htmlType="submit" loading={loading}>搜索</Button>
    </div>
  }

  return <Spin spinning={false}>
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
          className={`ZEleA-Form-${layoutType}`}
          onSubmit={handleSubmit}
        >
          <Render n={layout} value={[6, 6, 6, 6]} {...layoutConfig}>
            {fields.map(field => getFormItem(field, modelStatus, {
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