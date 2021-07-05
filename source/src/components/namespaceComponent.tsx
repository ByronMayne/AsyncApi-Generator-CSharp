import { FC } from "@asyncapi/generator-react-sdk";
import { indentSection } from "../helpers/formatHelper";
import { IParams } from "../IParams";
import { TextBlock } from "./textBlockComponent";

interface IProps {
  params: IParams,
  subNamespace?: string,
  childrenContent: string
}

/**
 * Creates a wrapper around an objec that is contained within a namespace 
 */
export const Namespace: FC<IProps> = ({ params, subNamespace, childrenContent }: IProps) => {
  let namespace = params.namespace;
  if (subNamespace) {
    namespace += `.${subNamespace}`;
  }
  return <TextBlock>
    {`namespace ${namespace}`}
    {`{`}
    {`${indentSection(childrenContent)}`}
    {`}`}
  </TextBlock>
}