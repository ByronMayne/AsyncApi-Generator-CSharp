import { FC } from "@asyncapi/generator-react-sdk";
import { AccessModifier } from "../enumerations/AccessModifier";
import { conditionalContent, equidistant, indentSection } from "../helpers/formatHelper";
import { getOrDefault } from "../helpers/getOrDefault";
import { TextBlock } from "./textBlockComponent";

interface IProps {
    name: string,
    baseType?: string,
    isAbstract?: boolean,
    isPartial?: boolean,
    accessModifier: AccessModifier,
    childrenContent: string,
    defaultConstructor: boolean,
}

/**
 * Creates a template to generate a class definition 
 * @param props The properties to be used for the template 
 * @returns The generated template
 */
export const Class: FC<IProps> = (props: IProps) => {
    const className = props.name;
    const accessModifier = getOrDefault(props.accessModifier, AccessModifier.Public);
    const abstractDef = conditionalContent(props.isAbstract, 'abstract');
    const partialDef = conditionalContent(props.isPartial, 'partial');

    const baseType: string = props.baseType
        ? ` : ${props.baseType}`
        : '';

    return <TextBlock>
        {`${equidistant(accessModifier, partialDef, abstractDef, 'class', className, baseType)}`}
        {`{`}
        {`${indentSection(props.childrenContent)}`}
        {`}`}
    </TextBlock>;
}