
let assigned = 1;
let fieldCount = 1;

class Item {
  constructor(obj) {
    const rst = { ...obj };
    // 只有 layout 才有 tips
    if (obj.tips === undefined) {
      rst.options.base.field.value = `field_${fieldCount++}`;
    }
    rst.id = assigned++;
    return rst;
  }
}

export default Item;