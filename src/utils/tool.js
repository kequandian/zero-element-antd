
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