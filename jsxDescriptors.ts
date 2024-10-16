import { JsxComponentDescriptor } from "@mdxeditor/editor";

export const jsxComponentDescriptors: JsxComponentDescriptor[] = [
	{
		name: "MyLeaf",
		kind: "text",
		source: "./external",
		props: [
			{ name: "foo", type: "string" },
			{ name: "bar", type: "string" },
			{ name: "onClick", type: "expression" },
		],
		hasChildren: true,
		Editor: GenericJsxEditor,
	},
	{
		name: "Marker",
		kind: "text",
		source: "./external",
		props: [{ name: "type", type: "string" }],
		hasChildren: false,
		Editor: () => (
			<div style={{ border: "1px solid red", padding: 8, margin: 8, display: "inline-block" }}>
				<NestedLexicalEditor getContent={(node) => node.children} getUpdatedMdastNode={(mdastNode, children) => ({ ...mdastNode, children })} />
			</div>
		),
	},
	{
		name: "BlockNode",
		kind: "flow",
		source: "./external",
		props: [],
		hasChildren: true,
		Editor: GenericJsxEditor,
	},
];
