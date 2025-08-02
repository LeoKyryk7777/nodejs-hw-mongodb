function parseNambur(value, defaultValue) {
  if (typeof value === 'undefined') {
    return defaultValue;
  }
  const parseValue = parseInt(value);
  if (Number.isNaN(parseValue) === true) {
    return defaultValue;
  }
  return parseValue;
}

export function parsePaginationParams(query) {
  const { page, perPage } = query;
  const parsedPage = parseNambur(page, 1);
  const parsedPerPage = parseNambur(perPage, 10);

  return { page: parsedPage, perPage: parsedPerPage };
}
