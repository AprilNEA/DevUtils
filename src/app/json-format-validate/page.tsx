'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useEffect, useState } from 'react';

import {
  Box,
  Button,
  Flex,
  Grid,
  Popover,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';
import ToolBar from '@/components/tool-bar';
import { SettingIcon } from '@/icons';
import { useAppStore } from '@/store';
import { isTauri } from '@/utils';

async function validateJson(stringToValidate: string): Promise<string> {
  if (isTauri()) {
    return await (
      await import('@tauri-apps/api')
    ).invoke('validate_json', { stringToValidate });
  }
  try {
    return JSON.stringify(JSON.parse(stringToValidate), null, 2);
  } catch (e) {
    return JSON.stringify(e, null, 2);
  }
}

function Setting() {
  const { delay, setDelay } = useAppStore();
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="1" variant="outline">
          <SettingIcon className="h-[16px] w-[16px]" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3">
          <Box grow="1">
            <Flex direction="row" justify="start" align="center" gap="2">
              <Text as="label" size="2">
                <Text>Delay: </Text>
              </Text>
              <TextField.Input
                value={delay}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setDelay(v);
                }}
              />
            </Flex>
            <Popover.Close>
              <Button size="1">Comment</Button>
            </Popover.Close>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}

export default function JSONFormatValidate() {
  const { delay } = useAppStore();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const debouncedInput = useDebouncedValue(input, delay, true);
  useEffect(() => {
    validateJson(debouncedInput).then((result) => setOutput(result));
  }, [debouncedInput]);

  return (
    <Grid className="h-full" columns="2" gap="3" width="auto">
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" justify="start" align="center" gap="2">
            <Text>Input</Text>
            <ToolBar input={input} setInput={setInput} />
          </Flex>
          <Setting />
        </Flex>

        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full"
        />
      </Flex>
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Text>Output</Text>
          <CopyButton valueToCopy={output} />
        </Flex>
        <TextArea className="grow whitespace-pre-wrap" value={output} />
      </Flex>
    </Grid>
  );
}
