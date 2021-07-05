import { FC } from "@asyncapi/generator-react-sdk";
import { indentSection } from "../helpers/formatHelper";

interface IProps {
  childrenContent: string,
}

/**
 * applies an indent to children 
 */
export const IndentBlock: FC<IProps> = (props: IProps) => {
  return <>{indentSection(props.childrenContent)}</>;
};
