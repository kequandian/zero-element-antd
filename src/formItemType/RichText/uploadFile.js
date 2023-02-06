import { upload } from 'zero-element/lib/utils/request';
import { get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default function (options, param) {
  const endpoint = getEndPoint()
  const { API = '/api/fs/uploadfile', headers } = options;
  upload(API, { file: param.file }, headers)
    .then((response) => {
      const { data } = response.data;
      if (data) {
        param.success({
          url: endpoint+data.url,
        })
      }
    })
    .catch((error) => {
      console.warn(error);
      param.error({
        msg: error,
      })
    })
}