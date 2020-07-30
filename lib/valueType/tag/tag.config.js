let statusMap = {};

function set(newMap) {
  statusMap = { ...statusMap,
    ...newMap
  };
}

export default statusMap;
export { set };