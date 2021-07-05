import { File } from '@asyncapi/generator-react-sdk';
import { Class } from '../../components/classComponents';
import { Description } from '../../components/descriptionComponent';
import { Br } from '../../components/helperComponents';
import { Namespace } from '../../components/namespaceComponent';
import { Property } from '../../components/propertyComponent';
import { TextBlock } from '../../components/textBlockComponent';
import { SetterMethod } from '../../enumerations/SetterMethod';
import { ITemplateContext } from '../../ITemplateContext';

export default function ({ params }: ITemplateContext) {
	return <File name="ChannelBase.cs">
		<Namespace params={params}>
			<Description target={descriptions.type} />
			<Class name="ChannelBase" isAbstract={true}>
				<TextBlock>
					<Property name="Route" type="Route" setterMethod={SetterMethod.None} description={descriptions.routeProperty} />
					<Description target={descriptions.defaultConstructor}/>
					{'protected Channel(Route route)'}
					{'{'}
					{'	Route = route;'}
					{'}'}
				</TextBlock>
				<Br />
				<TextBlock>
					{`/// <summary>`}
					{`/// Gets if the in coming socket hand shake shoudl be accepted by the chanel. You can override`}
					{`/// this method to provide authentication or filtering of connections.`}
					{`/// </summary>`}
					{`/// <param name="context">The context for the request</param>`}
					{`/// <returns>True if the connection should be accepted otherwise false</returns>`}
					{`public Task<bool> CanAcceptHandshakeAsync(HttpListenerContext context)`}
					{`	=> Task.FromResult(true);`}
				</TextBlock>
			</Class>
		</Namespace>
	</File>;
};

const descriptions = {
	type: "A shared common base class inheirted by all generated Channel objects",
	routeProperty: "Gets the route that the channel is listening for events on",
	defaultConstructor: "Initializes a new instance of a channel"
}