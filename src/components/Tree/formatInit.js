function formatInit(rspData) {
  if (!rspData) return [];

  if (rspData.id) {
    return rspData;
  } else if (rspData.children) {
    return rspData.children;
  }

  return [];
}

export default formatInit;