
export enum Casing {
  CamelCase,
  PascalCase,
  SnakeCase,
  SentenceCase,
  TitleCase,
  KababCase,
}

export const  toCamel = (input: String): String => {
  let result: String = "";

  result += input[0].toLocaleLowerCase();

  for (let i = 1; i < input.length; i++) {
    const char = input[i];

    if (char >= 'A' && char < 'Z') {
      result += ` `;
      result += char;
    }

    if (input[i - 1] == ' ') {
      result += char.toUpperCase();
    }
  }
  return result;
}

export const toTitle = (input: string): String => {
  let result: String = "";

  result += input[0].toUpperCase();

  for (let i = 1; i < input.length; i++) {
    const char = input[i];

    if (char >= 'A' && char < 'Z') {
      result += ` `;
      result += char;
    }

    if (input[i - 1] == ' ') {
      result += char.toUpperCase();
    }
  }
  return result;
}

export const toKebab = (input: String): String => {
  let result: String = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char >= 'A' && char < 'Z') {
      result += `-${result.toLowerCase()}`;
    }
    else if (char == ' ') {
      result += '-';
    }
    else {
      result += char;
    }

  }
  return result;
}