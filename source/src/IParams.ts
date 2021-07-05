import { GeneratorOutputKind } from "./enumerations/GeneratorOutputKind";
import { JsonLibraryType } from "./enumerations/JsonLibraryType";


/**
 * Defines the different options that can be set
 * for this generator 
 */
export interface IParams {
  namespace:string,
  jsonLibrary: JsonLibraryType,
  outputKind:GeneratorOutputKind
}