import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

// A helper function to add "not-prose" to any component
const withNotProse = <P extends React.ComponentProps<'div'>>(Component: React.ComponentType<P>) => {
  const WrappedComponent = (props: P) => {
    return <Component {...props} className={`not-prose ${props.className ?? ''}`} />;
  };

  return WrappedComponent;
};
export const MDXComponents = {
  Accordion: withNotProse(Accordion),
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
};

export default MDXComponents;
