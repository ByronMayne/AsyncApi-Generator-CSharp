export function normalizeSchemaName(schemaName:string):string {
  return schemaName.replace(/<|>/gm, '');
}
