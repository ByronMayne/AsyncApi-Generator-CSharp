/**
 * Defines an object that can be described
 */
 export interface IDescriable {
  hasDescription(): boolean
  description(): string
}