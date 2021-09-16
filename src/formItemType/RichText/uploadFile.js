import { upload } from 'zero-element/lib/utils/request';
import { get as getEndPoint } from 'zero-element/lib/utils/request/endpoint';

export default function (api, param) {
  const endpoint = getEndPoint()
  upload(api, { file: param.file })
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