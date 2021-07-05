import { IndentationTypes, render, withIndendation } from "@asyncapi/generator-react-sdk";
/**
 * Indents a section of code so that it uses the project standards
 * @param content The content to indent
 * @returns The indented content
 */
export const indentSection = (content: string | undefined): string => {
  return withIndendation(content, 1, IndentationTypes.TABS)
}

/**
 * Returns back the content value only if the condition is true.
 */
export const conditionalContent = (condition: boolean, content: string) => {
  return condition ? content : undefined;
}

/**
 * Places a sequence of elements with a single space between each as long
 * as they are not null
 * @param args the list of elements or strings to space out
 * @returns THe formatted elements 
 */
export const equidistant = (...args:Array<string|JSX.Element>) => {
  let definition = '';

  let isFirst: boolean = true;

  args.forEach(element => {

    if (!element) return;

    if (isFirst) {
      isFirst = false;
    } else {
      definition += ' ';
    }

    if (typeof element === 'string' || element instanceof String) {
      definition += element as string;
    } else {
      definition += render(element);
    }
  })
  return definition;
}