import { history } from 'umi';
import qs from 'qs'

export default function onPath({ options, record }) {
  const { path, query = { id: 'id' }, blank } = options;
  const data = {};
  Object.keys(query).forEach(toKey => {
    const formKey = query[toKey];
    data[toKey] = record[formKey] || formKey;
  });

  if (blank) {
    const url = qs.stringify(data);
    const pathStr = url ? `${path}?${url}` : path
    window.open(pathStr)
  } else {
    history.push({
      pathname: path,
      query: data,
    });
  }
  
}
