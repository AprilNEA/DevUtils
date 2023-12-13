'use client';

import clsx from 'clsx';
import { useClipboard } from 'foxact/use-clipboard';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

import { ClipboardCopyIcon } from '@radix-ui/react-icons';
import { Button, IconButton, Text } from '@radix-ui/themes';

const CopyButton = ({
  valueToCopy,
  className,
}: {
  valueToCopy: string;
  className?: string;
}) => {
  const { copy, copied, error } = useClipboard({
    // optional, default to 1000, the duration of the copied state after copying
    timeout: 1000,
    // optional, default to false, whether to use `window.prompt` as fallback when native copy method failed
    usePromptAsFallback: false,
    // optional. When `window.prompt` is used as a fallback, this text will be shown in the prompt dialog
    promptFallbackText:
      'Failed to copy to clipboard automatically, please manually copy the text below.',
    // optional. Triggers when copy failed and `usePromptAsFallback` is not enabled
    onCopyError(e) {
      toast('Failed to copy!');
    },
  });

  return (
    <Button
      size="1"
      variant="outline"
      className={clsx(className)}
      onClick={useCallback(() => copy(valueToCopy), [copy, valueToCopy])}
    >
      <ClipboardCopyIcon width="16" height="16" />
      <Text>{copied ? 'Copied' : 'Copy'}</Text>
    </Button>
  );
};
export default CopyButton;
