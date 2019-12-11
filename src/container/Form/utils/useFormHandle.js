import { useRef, useEffect } from "react";
import { getModel } from 'zero-element/lib/Model';
import Sub from './Subscription';

export default function useFormHandle(namespace, {
  config,
  formProps,
  forceInitForm,
}) {
  const formatValueRef = useRef({}); // 记录在提交之前需要格式化的字段
  const sub = useRef(new Sub());
  const model = getModel(namespace);
  const firstGetForm = useRef(true);
  const { API } = config;
  const { handle } = formProps;
  const { onGetOne } = handle;

  useEffect(_ => {
    if (firstGetForm.current) {
      firstGetForm.current = false;
    } else {
      if (forceInitForm !== undefined && API.getAPI) {
        onGetOne({});
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceInitForm])

  function formatValue(field, toType) {
    // 保存需要 format 的 字段与 format 的方式
    formatValueRef.current[field] = toType;
  }
  function handleGetFormData() {
    return model.getState().formData;
  }

  return [
    {
      formatValueRef,
      sub,
      model,
    },
    {
      onFormatValue: formatValue,
      onSaveOtherValue: sub.current.changeValue.bind(sub.current),
      onGetFormData: handleGetFormData,
      bindOnChange: sub.current.recordOnChange.bind(sub.current),
      onSpyChange: sub.current.subscriptionChange.bind(sub.current),
    }
  ]
}