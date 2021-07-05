import { File } from '@asyncapi/generator-react-sdk';
import { Class } from '../components/classComponents';
import { Description } from '../components/descriptionComponent';
import { Br } from '../components/helperComponents';
import { Namespace } from '../components/namespaceComponent';
import { Property } from '../components/propertyComponent';
import { TextBlock } from '../components/textBlockComponent';
import { Using } from '../components/usingComponent';
import { ITemplateContext } from '../ITemplateContext';

export default function ({ params }: ITemplateContext) {
	return <File name="SocketServer.cs">
		<Using name="System" />
		<Using name="System.Net" />
		<Using name="System.Net.WebSockets"/>
		<Using name="System.Collections.Generic" />
		<Using name="System.Threading.Tasks"/>
		<Br />
		<Namespace params={params}>
			<Description target={descript.class} />
			<Class name="SocketServer" isPartial={true} >
				<TextBlock>
					{`private readonly List<Channel> m_channels;

/// <summary>
/// Gets the number of channels that have been added to the server
/// </summary>
public int Count => m_channels.Count;

/// <summary>
/// Gets a read only list that contains all the added channels
/// </summary>
public IReadOnlyList<Channel> Channels => m_channels;

/// <summary>
/// Gets the base route that the socket server runs on 
/// </summary>
public Route BaseRoute { get; }

/// <summary>
/// Gets the sub protocol that is used for the socket connections
/// </summary>
public string SubProtocol { get; }

/// <summary>
/// Initializes a new instance of a socket server with the default
/// configuration.
/// </summary>
public SocketServer() : this(SocketServerConfiguration.Default)
{}

/// <summary>
/// Initializes a new instance of a socket server with the ability to change
/// the configuration settings. 
/// </summary>
public SocketServer(ServerConfiguration configuration) : this()
{
	m_channels = new List<Channel>();
	BaseRoute = configuration.BaseRoute;
	SubProtocol = configuration.SubProtocol;
	Initialize();
}

/// <summary>
/// Raised after the constructor has been invoked allowing for additional configuration
/// by the other partial definitions
/// </summary>
partial void Initialize();

/// <summary>
/// Adds a new channel to the socket server 
/// </summary>
/// <param name="channel">The channel instance to add</param>
/// <typeparam name="T">The type of the channel</typeparam>
public void AddChannel<T>(T channel) where T : Channel
{
	foreach(Channel c in m_channels)
	{
		if(c.Route == channel.Route)
		{
			throw new ArgumentException($"The channel of type {c.GetType().FullName} is already handling the route '{channel.Route}'.");
		}
	}
	m_channels.Add(channel);
}

/// <summary>
/// Processes an incomming http handleshake request and accepts the request
/// if it matches one of the channels
/// </summary>
/// <param name="socketContext">The http listener requests</param>
/// <returns>True if the request was handled otherwise false </returns>
public async Task<bool> ProcessHandShakeAsync(HttpListenerContext context)
{
	if (!context.Request.IsWebSocketRequest)
	{
		return false; // not a socket handshake 
	}

	// Check if it matches our base 
	Uri requestUrl = context.Request.Url;
	Route requestRoute = new Route(context.Request.Url.LocalPath);
	Route resolvedRoute = requestRoute;

	// We need to get the relative so we can get the channel
	if (BaseRoute.HasValue)
	{
		if (BaseRoute.IsParentOf(requestRoute))
		{
			resolvedRoute = requestRoute.GetRelative(BaseRoute);
		}
		else
		{
			// The route does not match the base 
			return false;
		}
	}

	foreach (Channel channel in m_channels)
	{
		if (channel.Route == resolvedRoute)
		{
			if (await channel.CanAcceptHandshakeAsync(context))
			{
				await AcceptHandshakeAsync(context);

			}

			break;
		}
	}
	// No matching channel was found 
	return false;
}

/// <summary>
/// Accepts the incoming web socket connection and returns back the new connection 
/// </summary>
/// <param name="context">The http context</param>
/// <returns>The accepted connection</returns>
protected virtual async Task<HttpListenerWebSocketContext> AcceptHandshakeAsync(HttpListenerContext context)
{
	HttpListenerWebSocketContext webSocketContext = await context.AcceptWebSocketAsync("");

	return webSocketContext;
}`}
				</TextBlock>
			</Class>
		</Namespace>
	</File>
}

const descript = {
			class: "Handles processing sockets and their respective channels"
}