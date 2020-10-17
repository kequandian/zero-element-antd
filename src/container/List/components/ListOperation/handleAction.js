import { formatAPI } from 'zero-element/lib/utils/format';

export default function handleAction(type, options, props, dispatch, other = {}) {
  const { record, handle, model } = props;
  const { API, tips, outside, saveToForm } = options;
  const { namespace } = model;
  const {
    index, // 当前点击的 outside index
  } = other;

  function handleResponse(func, ...rest) {
    const rst = func(...rest);

    if (rst && typeof rst.then === 'function') {
      return rst && rst.then(_ => {
        if (handle.onRefresh) {
          handle.onRefresh();
        }
      }).catch(_ => 0);
    }
    return Promise.resolve();
  }

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action type');
    return false;
  }
  type = type.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

  const actionFunc = handle[`on${type}`];
  if (typeof actionFunc === 'function') {
    model.setRecord(record);
    if (handle.onClickOperation) {
      handle.onClickOperation(record);
    }

    if (saveToForm) {
      console.warn(`saveToForm TODO`);
    }

    if (type === 'Delete') {
      dispatch({
        type: 'openConfirm',
        payload: {
          title: tips || '确定要删除该项吗？',
          operationIndex: -1,
          type: actionFunc.bind(null, { record }),
        }
      });
    } else {
      const payloadData = {
        record,
        options: {
          ...options,
          API: API ? formatAPI(API, { namespace, }) : API,
        },
      };

      if (tips) {
        dispatch({
          type: 'openConfirm',
          payload: {
            title: tips,
            operationIndex: outside ? index : -1,
            type: handleResponse.bind(null, actionFunc, payloadData, model),
          }
        });
      } else {
        handleResponse(actionFunc, payloadData, model);
        // rst && rst.then(_ => {
        //   if (handle.onRefresh) {
        //     handle.onRefresh();
        //   }
        // }).catch(_ => 0);
      }
    }

  } else {
    console.warn(`未注册的事件： on${type}`)
  }
}