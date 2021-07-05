import { FC } from "@asyncapi/generator-react-sdk";
import { AccessModifier } from "../enumerations/AccessModifier";
import { indentSection } from "../helpers/formatHelper";
import { getOrDefault } from "../helpers/getOrDefault";
import { TextBlock } from "./textBlockComponent";

interface IProps  {
  name: string,
  returnType?: string,
  accessModifier?: AccessModifier,
  childrenContent: string
}

/**
* Creates a template to generate a class definition 
* @param props The properties to be used for the template 
* @returns The generated template
*/
export const Method: FC<IProps> = ({name, returnType, accessModifier, childrenContent}: IProps) => {
  if (!accessModifier) accessModifier = AccessModifier.None;
  returnType = getOrDefault(returnType, 'void');

  return <TextBlock>
    {`${accessModifier} ${returnType} ${name} ()`}
    {'{'}
    {`${indentSection(childrenContent)}`}
    {'}'}
  </TextBlock>
}
