
class Sub {
  constructor() {
    this.map = {};
  }

  recordOnChange(name, func) {
    this.map[name] = func;
  }
  subscriptionChange({ values }) {
  }

  changeValue(name, value) {
    if (this.map[name]) {
      this.map[name](value);
    }
  }
}

export default Sub;