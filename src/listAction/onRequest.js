import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';

const methodMap = {
  'get': query,
  'post': post,
  'put': update,
  'delete': remove,
  'download': download,
};

export default function onRequest({ options, record }) {
  const { API, method = 'get', message = '操作成功', data = {} } = options;
  const match = methodMap[method];

  if (method === 'download') {
    return download(API, {
      method: options.downloadMethod,
      fileName: options.fileName,
    })
      .then(_ => {
        if (message) {
          msg.success(message);
        }
      })
      .catch(_ => msg.error(JSON.stringify(_)));
  }

  return match(API, data)
    .then(_ => {
      if (message) {
        msg.success(message);
      }
    })
    .catch(_ => msg.error(JSON.stringify(_)));
}