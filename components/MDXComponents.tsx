import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const MDXComponents = {
  Accordion: (props) => <Accordion {...props} />,
  AccordionContent: (props) => <AccordionContent {...props} />,
  AccordionItem: (props) => <AccordionItem {...props} />,
  AccordionTrigger: (props) => <AccordionTrigger {...props} />,
};

export default MDXComponents;
