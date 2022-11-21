/** 2021-6-29 新方法
 *  将原先旧方法做了更改，添加了endpoint节点，能够通过query来进行列表API获取传值的判断
 */
import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
import { message as msg } from 'antd';
import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
const endpoint = getEndpoint()
const methodMap = {
  'get': query,
  'post': post,
  'put': update,
  'delete': remove,
  'download': download
};
let loading = false
export default function onRequest(props) {
  const {
    options,
    record
  } = props;
  const {
    API,
    method = 'get',
    message = '操作成功',
    fileNameField,
    data = {},
    query = {
      id: 'id'
    }
  } = options;
  const match = methodMap[method];
  Object.keys(query).forEach(toKey => {
    const formKey = query[toKey];
    data[toKey] = record[formKey] || formKey;
  });

  // console.log(data)

  if(loading){
    return
  }
  
  loading = true

  if (method === 'download') {
    return download(endpoint+API, {
      method: options.downloadMethod,
      fileName: record[fileNameField] || options.fileName
    }).then(_ => {
      loading = false
      if (message) {
        msg.success(message);
      }
    }); // .catch(_ => msg.error(JSON.stringify(_)));
  }


  return match(endpoint+API, data).then(_ => {
    loading = false
    if (message) {
      msg.success(message);
    }
  }); // .catch(_ => msg.error(JSON.stringify(_)));
}



// 旧方法
// import { query, post, update, remove, download } from 'zero-element/lib/utils/request';
// import { message as msg } from 'antd';
// import { get as getEndpoint } from 'zero-element/lib/utils/request/endpoint';
// const endpoint = getEndpoint()
// const methodMap = {
//   'get': query,
//   'post': post,
//   'put': update,
//   'delete': remove,
//   'download': download
// };
// export default function onRequest(props) {
//   const {
//     options,
//     record
//   } = props;
//   const {
//     API,
//     method = 'get',
//     message = '操作成功',
//     fileNameField,
//     data = {},
//     query = {
//       id: 'id'
//     }
//   } = options;
//   const match = methodMap[method];
//   Object.keys(query).forEach(toKey => {
//     const formKey = query[toKey];
//     data[toKey] = record[formKey] || formKey;
//   });



//   if (method === 'download') {
//     return download(endpoint+API, {
//       method: options.downloadMethod,
//       fileName: record[fileNameField] || options.fileName
//     }).then(_ => {
//       if (message) {
//         msg.success(message);
//       }
//     }); // .catch(_ => msg.error(JSON.stringify(_)));
//   }


//   return match(endpoint+API, data).then(_ => {
//     if (message) {
//       msg.success(message);
//     }
//   }); // .catch(_ => msg.error(JSON.stringify(_)));
// }