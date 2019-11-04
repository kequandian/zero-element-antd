function formatInit(rspData) {
  if (!rspData) return [];

  if (rspData.id) {
    return rspData;
  } else if (rspData.children) {
    return rspData.children;
  }
  if (Array.isArray(rspData)) {
    return rspData;
  }

  return [];
}

export default formatInit;