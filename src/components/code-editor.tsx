import clsx from 'clsx';

import _CodeEditor from '@uiw/react-textarea-code-editor';

type CodeEditorProps = React.ComponentProps<typeof _CodeEditor>;
const CodeEditor: React.FC<CodeEditorProps> = (props) => {
  return (
    <div className="grow max-h-full overflow-auto">
      <_CodeEditor
        {...props}
        style={{
          fontSize: 14,
          backgroundColor: '#ffffff',
        }}
        className={clsx('h-full border rounded')}
      />
    </div>
  );
};
export default CodeEditor;
