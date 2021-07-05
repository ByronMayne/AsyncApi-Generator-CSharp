import { File } from '@asyncapi/generator-react-sdk';
import { Br } from '../components/helperComponents';
import { Namespace } from '../components/namespaceComponent';
import { Using } from '../components/usingComponent';
import { ITemplateContext } from '../ITemplateContext';

export default function ({ params }: ITemplateContext) {
	return <File name="Route.cs">
		<Using name="System" />
		<Using name="System.Diagnostics" />
		<Using name="System.Runtime.Serialization" />
		<Br />
		<Namespace params={params}>
			{`//<summary>
/// A base implemention defining common functionality of all socket channel 
/// </summary>
[Serializable]
[DebuggerDisplay("{m_value}")]
public struct Route : ISerializable
{
	private static readonly char[] s_pathSeparators;
	private static readonly StringComparison s_stringComparison;
	private readonly string m_value;

	/// <summary>
	/// Gets if the route currently has a value 
	/// </summary>
	public bool HasValue 
		=> !string.IsNullOrEmpty(m_value);

	/// <summary>
	/// Gets if the route currently has a value 
	/// </summary>
	public static Route Unset { get; }

	/// <summary>
	/// Creates a new route object based off a string 
	/// </summary>
	/// <param name="path">The path to create the route for</param>
	public Route(string path) : this(path, true)
	{}

	/// <summary>
	/// Constructor used to implement <see cref="ISerializable"/> interface
	/// </summary>
	private Route(SerializationInfo info, StreamingContext context)
	{
		m_value = info.GetString(nameof(m_value));
	}


	/// <summary>
	/// Creates a new instance of the path type with the option to normalize the input.
	/// </summary>
	/// <param name="path">The path to create it for</param>
	/// <param name="normalize">If true the input will be normalized otherwise it will be used as is</param>
	private Route(string path, bool normalize)
	{
		if(normalize)
		{
			m_value = Normalize(path);
		}
		else
		{
			m_value = path;
		}
	}

	/// <summary>
	/// Gets if the other route is equal to or a more defined path. 
	/// </summary>
	/// <param name="other">The route to check</param>
	/// <returns>True if the route is a releated to it</returns>
	public bool IsParentOf(Route other)
	{
		if (HasValue && !other.HasValue) return false;
		if (!HasValue && other.HasValue) return false;
		if (!HasValue && !other.HasValue) return true;
		return m_value.StartsWith(other.m_value);
	}
	
	/// <summary>
	/// Gets the relative path of one route to another 
	/// </summary>
	public Route GetRelative(Route relativeTo)
	{
		if (!relativeTo.IsParentOf(this)) throw new ArgumentException("You can only get relative paths of routes that are children");
		string relativePath = m_value.Substring(relativeTo.m_value.Length);
		return new Route(relativePath, true);
	}

	/// <summary>
	/// Initializes the static values for the class definition
	/// </summary>
	static Route()
	{
		s_pathSeparators = new char[] { '/', '\\\\'};
		s_stringComparison = StringComparison.Ordinal;
		Unset = new Route("");
	}

	/// <summary>
	/// Takes in a string path and normalizes the text
	/// and forces a standard on it.
	/// </summary>
	/// <param name="path">The path to normalize</param>
	/// <returns>The normalized path</returns>
	private static string Normalize(string path)
	{
		if(string.IsNullOrEmpty(path))
		{
			return "";
		}
		path = path.ToLower();
		string[] segements = path.Split(s_pathSeparators,StringSplitOptions.RemoveEmptyEntries);
		return $"/{string.Join('/', segements)}";
	}

	/// <summary>
	/// Combines two routes into one by appending the right value to the left 
	/// </summary>
	/// <param name="left">The base route</param>
	/// <param name="right">The route being appended</param>
	/// <returns>The created route</returns>
	public static Route operation /(Route left, Route right) 
		=> new Route($"{left}{right}", false);

	/// <summary>
	/// Returns back the raw string of this path. 
	/// </summary>
	public static implicit operator string?(Route route)
		=> route.m_value;

	/// <summary>
	/// Returns true if the Route has a value otherwise false
	/// </summary>
	/// <param name="route">The path to check</param>
	/// <returns>True if it has a value and false if it does not</returns>
	public static bool operator true(Route route)
		=> route.HasValue;

	/// <summary>
	/// Returns false if the Route has no value value otherwise true
	/// </summary>
	/// <param name="route">The path to check</param>
	/// <returns>True if it has a value and false if it does not</returns>
	public static bool operator false(Route route)
		=> !route.HasValue;

	/// <summary>
	/// Returns back if two routes are equal to each other 
	/// </summary>
	public static bool operator ==(Route left, Route right)
		=> string.Equals(left.m_value, right.m_value, s_stringComparison);

	/// <summary>
	/// Returns back if two routes are not equal to each other 
	/// </summary>
	public static bool operator !=(Route left, Route right)
		=> !string.Equals(left.m_value, right.m_value);

	/// <summary>
	/// Get sif two paths are equal to each other
	/// </summary>
	public bool Equals(Route other)
		=> string.Equals(other.m_value, m_value, s_stringComparison);

	/// <inheritdoc cref="System.Object"/>
	public override string ToString()
		=> m_value;

	/// <inheritdoc cref="System.Object"/>
	public override int GetHashCode()
		=> HasValue 
			? m_value.GetHashCode()
 			: 0;

	/// <inheritdoc cref="IComparable{T}"/>
	public int CompareTo(Route other)
		=> string.Compare(m_value, other.m_value, s_stringComparison);

	/// <inheritdoc cref="ISerializable"/>
	void ISerializable.GetObjectData(SerializationInfo info, StreamingContext context)
	{
		info.AddValue(nameof(m_value), m_value);
	}
}`}
		</Namespace>
	</File>
}