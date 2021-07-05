import { File, render } from '@asyncapi/generator-react-sdk';
import { AsyncAPIDocument } from '@asyncapi/parser';
import { titleCase } from 'title-case';
import { Class } from '../components/classComponents';
import { Description } from '../components/descriptionComponent';
import { Br } from '../components/helperComponents';
import { IndentBlock } from '../components/indentBlockComponent';
import { Namespace } from '../components/namespaceComponent';
import { Property } from '../components/propertyComponent';
import { TextBlock } from '../components/textBlockComponent';
import { ITemplateContext } from "../ITemplateContext";

export default function ({ params, asyncapi }: ITemplateContext) {
  return <File name="ServerConfiguration.cs">
    <Namespace params={params}>
      <Description target={descriptions.class} />
      <Class name="ServerConfiguration">
        {defineServerEnum(asyncapi)}
        <Property name="SubProtocol" type="string" description={descriptions.subProtocol} />
        <Property name="BaseRoute" type="Route" description={descriptions.baseRoute} />
        <Br />
        {defineServers(asyncapi)}
      </Class>
    </Namespace>
  </File>
};


const defineServerEnum = (asyncapi: AsyncAPIDocument) => {
  const servers = asyncapi.serverNames()
    .map(serverName => {
      const server = asyncapi.server(serverName);

      return <>
        <Description target={server} />
        <TextBlock>{`${titleCase(serverName)},`}</TextBlock>
        </>
    });

  return <>
    <Description target={descriptions.serverNamesEnum} />
    <TextBlock>
      {`public enum Names`}
      {`{`}
    </TextBlock>
    <IndentBlock>
      <TextBlock>
        {`/// <summary>`}
        {`/// A server that was not defined`}
        {`/// </Summary>`}
        {`Undefined,`}
      </TextBlock>
      {render(servers)}
    </IndentBlock>
    <TextBlock>
      {`}`}
    </TextBlock>
  </>
}


const defineServers = (asyncapi: AsyncAPIDocument) => {
  if (!asyncapi.hasServers()) return undefined;
  const servers: Array<JSX.Element> = [];

  asyncapi.serverNames().forEach(serverName => {
    const server = asyncapi.server(serverName);

    servers.push(<>
      <Description taget={server} />
      <TextBlock>
        {`public static ServerConfiguration ${titleCase(serverName)}()`}
        {`{`}
        {`}`}
      </TextBlock>
    </>)
  });

  return render(servers);
}

const descriptions = {
  class: "Contains settings for configuration of the web socket server",
  subProtocol: "Gets or sets the sub protocol to use for the socket connection",
  baseRoute: "Gets or sets the base route that the socket server should listen from ",
  serverNamesEnum: "Defines the different severs that were configured in the AsyncApi document"
}