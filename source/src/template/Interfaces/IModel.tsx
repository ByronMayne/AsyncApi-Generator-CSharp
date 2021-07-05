import { File } from '@asyncapi/generator-react-sdk';
import { Description } from '../../components/descriptionComponent';
import { Namespace } from '../../components/namespaceComponent';
import { ITemplateContext } from '../../ITemplateContext';

export default function ({ params }: ITemplateContext) {
  return <File name="IModel.cs">
    <Namespace params={params}>
      <Description target={des.class} />
      {`public interface IModel`}
      {`{}`}
    </Namespace>
  </File>
}

const des = {
  class: "Empty base interface that all models inheirt from."
}