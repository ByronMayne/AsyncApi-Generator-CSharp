import { FC } from "@asyncapi/generator-react-sdk";
import { isStringType } from "../helpers/typeHelper";


/**
 * Takes all children and renders them out line by line
 */
export const TextBlock: FC = ({ children }) => {
  let definition: String = '';

  if (isStringType(children)) {
    definition = `${children as String}\n`;
  }
  else {
    for (let i in children) {
      definition += `${children[i]}\n`;
    }
  }
  return definition;
}