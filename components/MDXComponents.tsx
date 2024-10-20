import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode } from "react";

const NoProse = ({ children }: { children: ReactNode }) => <div className="not-prose">{children}</div>;

export const MDXComponents = {
	Accordion: (props: React.ComponentProps<typeof Accordion>) => (
		<NoProse>
			<Accordion {...props} />
		</NoProse>
	),
	AccordionContent: (props: React.ComponentProps<typeof AccordionContent>) => (
		<NoProse>
			<AccordionContent {...props} />
		</NoProse>
	),
	AccordionItem: (props: React.ComponentProps<typeof AccordionItem>) => (
		<NoProse>
			<AccordionItem {...props} />
		</NoProse>
	),
	AccordionTrigger: (props: React.ComponentProps<typeof AccordionTrigger>) => (
		<NoProse>
			<AccordionTrigger {...props} />
		</NoProse>
	),
};

export default MDXComponents;
