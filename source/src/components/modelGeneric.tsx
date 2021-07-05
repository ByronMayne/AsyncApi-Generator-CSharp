import { FC, render } from "@asyncapi/generator-react-sdk";
import { Schema } from "@asyncapi/parser";
import { titleCase } from "title-case";
import { SetterMethod } from "../enumerations/SetterMethod";
import { indentSection } from "../helpers/formatHelper";
import { getSchemaType } from "../helpers/typeHelper";
import { IParams } from "../IParams";
import { Description } from "./descriptionComponent";
import { Br } from "./helperComponents";
import { Property } from "./propertyComponent";
import { TextBlock } from "./textBlockComponent";

interface IProps {
  className: string,
  schema: Schema,
  params: IParams
}

export const ModelGeneric: FC<IProps> = ({ schema, className, params }: IProps) => {
  return <>
    <Description target={schema} />
    <TextBlock>
      {`public sealed record ${className} : IModel`}
      {`{`}
      {`${indentSection(DefineProperties(schema, params))}`}
      {`}`}
    </TextBlock>
  </>
}

const DefineConstructors = (className:string): string => {
  return `/// <summary>
/// Creates a new instance of a ${className}
/// </summary>
public ${className}()
{}`
}

const DefineProperties = (schema: Schema, params:IParams):string => {

  let definition: Array<JSX.Element> = [];

  for (let propertyName in schema.properties()) {
    const property = schema.property(propertyName);
    const isRequired: boolean = schema.required()?.includes(propertyName);

    definition.push(<>
      <Br />
      <Description target={property} />
      <TextBlock>
        {GetJsonAttributes(propertyName, isRequired)}
      </TextBlock>
      <Property type={getSchemaType(property)}
        name={titleCase(propertyName)}
        SetterMethod={SetterMethod.Init} />
    </>);
  }

  return render(definition);
}

const GetJsonAttributes = (propertyName, required: boolean): string => {
  let definition: string = "";
  if (required) {
    definition += "[Required]\n";
  }
  definition += `[JsonPropertyName("${propertyName}")]`;
  return definition
}
