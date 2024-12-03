function parseContactType(value) {
  if (typeof value !== 'string') {
    return undefined;
  }

  const isContactType = ['work', 'home', 'personal'];
  return isContactType.includes(value) ? value : undefined;
}

function parseBoolean(value) {
  if (value === 'true') {
    return true; // Якщо значення 'true', повертаємо true
  }

  if (value === 'false') {
    return false; // Якщо значення 'false', повертаємо false
  }

  return undefined; // Якщо значення некоректне, повертаємо undefined
}

export function parseFilterParams(query) {
  const { type, isFavourite } = query;

  const parseType = parseContactType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    type: parseType,
    isFavourite: parsedIsFavourite,
  };
}
