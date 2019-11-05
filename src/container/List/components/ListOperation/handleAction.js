import { getDataPool } from 'zero-element/lib/DataPool';
import { formatAPI } from 'zero-element/lib/utils/format';

export default function handleAction(type, options, props, dispatch) {
  const { record, handle, context } = props;
  const { API, tips, saveToForm } = options;
  const { namespace } = context;
  const dataPool = getDataPool(namespace);

  function handleResponse(func, ...rest) {
    const rst = func(...rest);
    rst && rst.then(_ => {
      if (handle.onRefresh) {
        handle.onRefresh();
      }
    }).catch(_ => 0);
  }

  if (type === undefined) {
    console.warn('请指定 list operation 所用的 action');
    return false;
  }
  type = type.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());

  const actionFunc = handle[`on${type}`];
  if (typeof actionFunc === 'function') {
    dataPool.setRecord(record);
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
          action: actionFunc.bind(null, { record }),
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
            action: handleResponse.bind(null, actionFunc, payloadData, context),
          }
        });
      } else {
        handleResponse(actionFunc, payloadData, context);
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