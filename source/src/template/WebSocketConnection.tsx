import { File } from '@asyncapi/generator-react-sdk';
import { Class } from '../components/classComponents';
import { Description } from '../components/descriptionComponent';
import { Namespace } from '../components/namespaceComponent';
import { ITemplateContext } from "../ITemplateContext";

export default function ({ params }: ITemplateContext) {
	return <File name="WebSocketConnection.cs">
		<Namespace params={params}>
			<Description target={description.class} />
			<Class className="WebSocketConnection">

			</Class>
		</Namespace>
	</File>
}

const description = {
	class: "Contains information about WebSocket connection"
}