import { FC } from "react";
import { TextBlock } from "./textBlockComponent";


interface IProps {
  name: string
}

/**
 * Creates a line with a namespace using 
 */
export const Using: FC<IProps> = ({ name }: IProps) => {
  return <TextBlock>{`using ${name};\n`}</TextBlock>
};




