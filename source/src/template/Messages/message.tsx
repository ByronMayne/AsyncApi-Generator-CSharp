import { File } from '@asyncapi/generator-react-sdk';
import { Message } from '@asyncapi/parser';
import { ModelGeneric } from '../../components/modelGeneric';
import { Namespace } from '../../components/namespaceComponent';
import { Using } from '../../components/usingComponent';
import { ITemplateContext } from '../../ITemplateContext';


export default function (props: ITemplateContext) {

  console.log(JSON.stringify(props))

  if (!props.asyncapi.hasMessages()) {
    console.log("Message Count: 0");
    return undefined;
  }

  const messages: Map<String, Message> = props.asyncapi.allMessages();

  console.log(`Message Count: ${messages.size}`);
  
  return Array.from(messages).map(([messageName, message]) => (
    <File name={`${messageName}.cs`}>
      <Using name="System" />
      <Using name="System.Text.Json.Serialization" />
      <Using name="System.ComponentModel.DataAnnotations" />
      <Namespace params={props.params}>
        <ModelGeneric params={props.params} className={messageName} schema={message.payload()} />
      </Namespace>
    </File>
  ));
}