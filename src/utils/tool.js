
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