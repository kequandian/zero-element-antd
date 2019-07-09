import { query, post, update, remove } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';

const methodMap = {
  'get': query,
  'post': post,
  'put': update,
  'delete': remove,
};

export default function onRequest({ options, record }) {
  const { API, method = 'get', message = '操作失败' } = options;
  const match = methodMap[method];

  match(API).catch(_ => msg.error(message));
}