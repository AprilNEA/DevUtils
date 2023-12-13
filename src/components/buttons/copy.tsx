"use client";

import { useClipboard } from "foxact/use-clipboard";
import { toast } from "react-hot-toast";
import { useCallback } from "react";
import { Button } from "@radix-ui/themes";
import clsx from "clsx";

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
      "Failed to copy to clipboard automatically, please manually copy the text below.",
    // optional. Triggers when copy failed and `usePromptAsFallback` is not enabled
    onCopyError(e) {
      toast("Failed to copy!");
    },
  });

  return (
    <Button
      className={clsx(className)}
      onClick={useCallback(() => copy(valueToCopy), [copy, valueToCopy])}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
};
export default CopyButton;
