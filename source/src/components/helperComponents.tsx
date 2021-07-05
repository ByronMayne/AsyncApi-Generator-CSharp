import { FC } from "react";
import { TextBlock } from "./textBlockComponent";

interface IProps {

}

/**
 * Breaks onto a new line 
 */
 export const Br: FC<IProps> = () => {
   return <>'\n</>
}