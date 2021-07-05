import { Schema } from "@asyncapi/parser";

/**
 * Returns back if the type sent in is a string 
 * @param target The taget to check the type
 * @returns True if it's a string otherwise false 
 */
export const isStringType = (target: any): boolean => {
  return typeof target === 'string' || target instanceof String
}


export function getSchemaType(schema: Schema): string {
  const type: string = schema.type() as string;
  const format: string = schema.format();

  switch (type) {
    case 'number':
      switch (format) {
        default: return 'float';
        case 'float': return 'float';
        case 'double': return 'double';
      }
    case 'integer': {
      switch (format) {
        default: return 'int';
        case 'int32': return 'int';
        case 'int64': return 'long';
      }
    }
    case 'boolean': return 'bool';
    case 'string':
      switch (format) {
        default: return 'string';
        case 'date-time':
        case 'date': return 'DateTime';
        case 'byte': return 'byte';
        case 'binary': return 'byte[]';
      }
  }
  return type;
}