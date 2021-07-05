import { AsyncAPIDocument } from "@asyncapi/parser";
import { IParams } from "./IParams";

/**
 * Defines a strongly typed version of the TemplateContext
 * provided by the async api generator 
 */


export interface ITemplateContext {
  asyncapi: AsyncAPIDocument,
  params: IParams,
  originalAsyncAPI: string,
}