import { FC, File as RFile, render, Text } from '@asyncapi/generator-react-sdk';
import { titleCase } from "title-case";
import { Channel } from '@asyncapi/parser';
import { indentSection } from '../../helpers/formatHelper';
import { Class } from '../../components/classComponents';
import { ITemplateContext } from '../../ITemplateContext';
import { Using } from '../../components/usingComponent';
import { Namespace } from '../../components/namespaceComponent';
import { Description } from '../../components/descriptionComponent';
import { TextBlock } from '../../components/textBlockComponent';
import { Property } from '../../components/propertyComponent';
import { SetterMethod } from '../../enumerations/SetterMethod';
import { Br } from '../../components/helperComponents';

export default function ({ asyncapi, params }: ITemplateContext) {
	if (!asyncapi.hasChannels()) return;

	const files = [];

	for (let route in asyncapi.channels()) {
		const moduleName: string = titleCase(route.replace("/", " ")).replace(" ", "");
		const className: string = `${moduleName}ChannelBase`;
		const channel: Channel = asyncapi.channel(route);
		files.push(
			<RFile name={`${className}.cs`}>
				<Using name={`System`} />
				<Using name={`System.IO`} />
				<Using name={`System.Text.Json`} />
				<Using name={`System.Threading.Tasks`} />
				<Using name={`${params.namespace}.Sockets`} />
				<Namespace params={params}>
					<Description target={channel} />
					<Class name={className} baseType={'Channel'}>
						<Property name="SerializerOption"
							type="JsonSerializerOptions"
							description={descriptions.serializerOptions}
							setterMethod={SetterMethod.Init} />
						<TextBlock>
							{`public ${className}() : base(new Route("${route}"))`}
							{`{`}
							{`    SerializerOption = new JsonSerializerOptions();`}
							{`}`}
						</TextBlock>
						<SubscriptionMethods channel={channel} />
						<PublishingMethods channel={channel} />
						<MessageProcessing channel={channel} />
					</Class>
				</Namespace>
			</RFile>);
	}
	return files;
}

interface IChannelProps {
	channel:Channel
}

const SubscriptionMethods: FC<IChannelProps> = ({ channel }:IChannelProps) => {
	if (!channel.hasSubscribe()) {
		return undefined;
	}
	const subscription = channel.subscribe();

	return subscription.messages().map<JSX.Element>(msg => {
		return <>
			<Br/>
			<Description target={msg} />
			<TextBlock>
				{`public async Task BroadcastAsync(${msg.name()} payload)`}
				{`{`}
				{`    string json = JsonSerializer.Serialize(payload);`}
				{'}'}
			</TextBlock>
		</>
	});

}

const PublishingMethods: FC<IChannelProps> = ({ channel }:IChannelProps) => {
	if (!channel.hasPublish()) {
		return undefined;
	}
	const publish = channel.publish();

	return publish.messages().map<JSX.Element>(msg => {
		return <>
			<Br />
			<Description target={msg} />
			<Text>
				<TextBlock>
					{`/// <summary>`}
					{`/// Invoked when a ${msg.name()} message is received from a client`}
					{`/// </summary`}
					{`/// <param name="message">The message payload</param>`}
					{`/// <returns>A task to await upon</returns>`}
				</TextBlock>
				{`public abstract Task ReceivedAsync(${msg.name()} message);`}
			</Text>
		</>;
	});
}


const MessageProcessing: FC<IChannelProps> = ({ channel }: IChannelProps) => {
	if (!channel.hasPublish()) return undefined;
	const publish = channel.publish();

	let methodBody;

	if (publish.hasMultipleMessages()) {
		methodBody = MultiMessageProcessing(channel);
	} else {
		methodBody = SingleMessageProcessing(channel);
	}

	return <TextBlock>
		{''}
		{'/// <inheritdoc cref="Channel"/>'}
		{'protected override async Task OnMessageReceived(SocketConnection socketConnection, Stream stream, MessageType messageType)'}
		{'{'}
		{indentSection(render(methodBody))}
		{'}'}
	</TextBlock>
}

const MultiMessageProcessing = (channel:Channel) => {
	const messages = channel.publish().messages();
	if (!messages) return undefined;

	const switchCases = messages.map(msg => <TextBlock>
		{`case "${msg.name()}":`}
		{'{'}
		{`	${msg.name()} message = JsonSerializer.Deserialize<${msg.name()}>(rawJson, SerializerOption);`}
		{`	await ReceivedAsync(message);`}
		{`}`}
		{`break;`}
	</TextBlock>);

	return <TextBlock>
			{``}
			{`JsonDocument jsonDocument = await JsonDocument.ParseAsync(stream);`}
			{`JsonElement jsonElement = jsonDocument.RootElement;`}
			{`JsonElement messageNameProperty = jsonElement.GetProperty("name");`}
			{`string messageName = messageNameProperty.GetString();`}
			{`string rawJson = jsonElement.GetRawText();`}
			{''}
			{'switch(messageName)'}
			{'{'}
			{indentSection(render(switchCases))}
			{'}'}
		</TextBlock>
}

const SingleMessageProcessing = (channel: Channel) => {
	const message = channel.publish().message();

	return <TextBlock>
		{`${message.name()} message = await JsonSerializer.DeserializeAsync<${message.name()}>(stream, SerializerOption);`}
		{`await ReceivedAsync(message);`}
	</TextBlock>
}

const descriptions = {
	serializerOptions: "Gets the options that is used for request deserializtion"
}