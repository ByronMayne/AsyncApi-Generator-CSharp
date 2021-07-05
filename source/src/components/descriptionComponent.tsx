import { FC } from "@asyncapi/generator-react-sdk";
import { isStringType } from "../helpers/typeHelper";
import { IDescriable } from "../interfaces/IDescriable";

interface IProps  {
  target: IDescriable|string,
}

/**
 * Creates a <summary> block above an object that has a description
 * @param target 
 * @returns 
 */
export const Description: FC<IProps> = ({ target }: IProps) => {
  let content: String = "";

  if (!target) {
    return undefined;
  }
  else if (isStringType(target)) {
    content = target as String;
  } else {
    const descriable = target as IDescriable;
    if (!descriable.hasDescription()) return undefined;
    content = descriable.description();
  }
  
  return `
/// <summary>
/// ${content}
/// <summary>
`;
}
