
let assigned = 0;

class Item {
  constructor(obj) {
    const rst = {...obj};
    if (obj.id === 0) {
      assigned = obj.id;
    }
    if (obj.type === 'Layout') {
      rst.items = [];
    }
    rst.id = assigned++;
    return rst;
  }
}

export default Item;