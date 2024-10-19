import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const NoProse = ({ children }) => <div className="not-prose">{children}</div>;

export const MDXComponents = {
	Accordion: (props) => (
		<NoProse>
			<Accordion {...props} />
		</NoProse>
	),
	AccordionContent: (props) => (
		<NoProse>
			<AccordionContent {...props} />
		</NoProse>
	),
	AccordionItem: (props) => (
		<NoProse>
			<AccordionItem {...props} />
		</NoProse>
	),
	AccordionTrigger: (props) => (
		<NoProse>
			<AccordionTrigger {...props} />
		</NoProse>
	),
};

export default MDXComponents;
