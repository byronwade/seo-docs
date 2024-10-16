import { Button } from '@/components/ui/button';
import { usePublisher } from '@mdxeditor/editor';
import { insertJsx$ } from '@mdxeditor/editor';

const InsertMyLeaf = () => {
  const insertJsx = usePublisher(insertJsx$);
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: 'MyLeaf',
          kind: 'text',
          props: { foo: 'bar', bar: 'baz', onClick: { type: 'expression', value: '() => console.log("Clicked")' } }
        })
      }
    >
      Leaf
    </Button>
  );
};

export default InsertMyLeaf;
