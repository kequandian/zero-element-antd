

const data = {};

export function setShare(key, value) {
  data[key] = value;
}

export function getShareData(key) {
  if (data[key]) {
    return data[key];
  }
  return {};
}

export function destroyShare(key) {
  delete data[key];
}