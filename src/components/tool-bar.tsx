'use client';

import { Button, Flex } from '@radix-ui/themes';

import { readClipBoard } from '@/utils';

export default function ToolBar<T = string | number>({
  input,
  setInput,
  clear,
  sample,
}: {
  input: T;
  setInput: (v: string) => void;
  clear?: () => void;
  sample?: string;
}) {
  return (
    <Flex direction="row" justify="start" align="center" gap="2">
      <Button
        size="1"
        variant="outline"
        onClick={async () => setInput(await readClipBoard())}
      >
        Clipboard
      </Button>
      {sample && (
        <Button size="1" variant="outline" onClick={() => setInput(sample)}>
          Sample
        </Button>
      )}
      <Button size="1" variant="outline" onClick={clear}>
        Clear
      </Button>
    </Flex>
  );
}
