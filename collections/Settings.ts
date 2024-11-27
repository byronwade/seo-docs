import { GlobalConfig } from "payload";

export const Settings: GlobalConfig = {
	slug: "settings",
	access: {
		read: () => true, // Anyone can read settings
	},
	fields: [
		{
			name: "contact",
			type: "group",
			fields: [
				{
					name: "phoneNumber",
					type: "text",
					required: true,
				},
				{
					name: "email",
					type: "email",
					required: true,
				},
				{
					name: "address",
					type: "group",
					fields: [
						{
							name: "line1",
							type: "text",
							required: true,
						},
						{
							name: "line2",
							type: "text",
						},
						{
							name: "city",
							type: "text",
							required: true,
						},
						{
							name: "state",
							type: "text",
							required: true,
						},
						{
							name: "zip",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
		{
			name: "social",
			type: "group",
			fields: [
				{
					name: "facebook",
					type: "text",
					label: "Facebook URL",
				},
				{
					name: "twitter",
					type: "text",
					label: "Twitter URL",
				},
				{
					name: "instagram",
					type: "text",
					label: "Instagram URL",
				},
				{
					name: "linkedin",
					type: "text",
					label: "LinkedIn URL",
				},
			],
		},
		{
			name: "seo",
			type: "group",
			fields: [
				{
					name: "defaultTitle",
					type: "text",
					label: "Default Page Title",
				},
				{
					name: "defaultDescription",
					type: "textarea",
					label: "Default Meta Description",
				},
				{
					name: "defaultImage",
					type: "upload",
					relationTo: "media",
					label: "Default Social Share Image",
				},
			],
		},
	],
};
