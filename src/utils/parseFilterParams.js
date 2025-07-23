function parseType(type) {
  if (typeof type !== 'string') {
    return;
  }
  if (['work', 'home', 'personal'].includes(type)) {
    return type;
  }
}

export function parseFilterParams(query) {
  const { type } = query;
  const parsedType = parseType(type);
  return { type: parsedType };
}
