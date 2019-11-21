
/**
 * 基本元素列表去重
 *
 * @export
 * @param {Array} argus 基本元素组成的列表
 */
export function unique(argus) {
  return [...new Set(
    argus.reduce(((acc, val) =>
      acc.concat(val)
    ), [])
  )];
}

/**
 * 尝试把数据转换为 Number 类型，若失败则返回原数据
 *
 * @export
 * @param {string} value
 * @returns
 */
export function toNumber(value) {
  let v = value;
  if (v) {
    v = Number(v);
    if (isNaN(v)) {
      v = value;
    }
  }
  return v;
}

/**
 * 上移或下移数组内的某一项，直接改变原数组
 *
 * @export
 * @param {array} arr
 * @param {string} type up | down
 * @param {number} index
 */
export function arrayItemMove(arr, type, index) {
  if (!Array.isArray(arr) || arr.length < 2) return false;

  if (type === 'up' && index > 0) {
    arr.splice(
      index - 1,
      1,
      ...arr.splice(index, 1, arr[index - 1]),
    );
  } else if (type === 'down' && index < arr.length - 1) {
    arr.splice(
      index + 1,
      1,
      ...arr.splice(index, 1, arr[index + 1]),
    );
  }
}