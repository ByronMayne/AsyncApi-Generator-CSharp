import { FC, render } from "@asyncapi/generator-react-sdk";
import { AccessModifier } from "../enumerations/AccessModifier";
import { SetterMethod } from "../enumerations/SetterMethod";
import { equidistant } from "../helpers/formatHelper";
import { IDescriable } from "../interfaces/IDescriable";
import { Description } from "./descriptionComponent";
import { Br } from "./helperComponents";
import { TextBlock } from "./textBlockComponent";


interface IProps {
  name: string,
  type: string
  accessModifier?: AccessModifier
  setterMethod?: SetterMethod
  description: string | IDescriable
}

/**
 * Creates a wrapper around an objec that is contained within a namespace 
 */
 export const Property: FC<IProps> = ({ name, type, accessModifier, setterMethod, description }: IProps) => {
  if (!accessModifier) accessModifier = AccessModifier.Public;
  if (!setterMethod) setterMethod = SetterMethod.Public;

  let setter: string = undefined;

  switch (setterMethod) {
      case SetterMethod.Init:
          setter = "init;"
          break;
      case SetterMethod.Public:
          setter = "set;"
          break;
      case SetterMethod.Private:
          setter = "private set;"
          break;
  }

   return render(<>
     <Description target={description} />
     <>{equidistant(accessModifier, type, name, '{', 'get;', setter, '}')}</>
   </>);
}