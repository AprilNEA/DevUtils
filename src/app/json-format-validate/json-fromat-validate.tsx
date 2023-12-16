'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { JSONPath } from 'jsonpath-plus';
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

async function validateJson(
  stringToValidate: string,
  jsonpath?: string,
): Promise<string> {
  if (isTauri()) {
    return await (
      await import('@tauri-apps/api')
    ).invoke('validate_json', {
      stringToValidate,
      path: !!jsonpath ? jsonpath : undefined, // empty string should be undefined
    });
  }
  try {
    const parsed = JSON.parse(stringToValidate);
    const result = jsonpath
      ? JSONPath({ path: jsonpath, json: parsed })
      : parsed;
    return JSON.stringify(result, null, 2);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return e.message;
    }
    return 'Unknown error';
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
  const [outputError, setOutputError] = useState('');
  const [jsonpath, setJsonpath] = useState('');

  // debounce input to delay update
  const debouncedInput = useDebouncedValue(input, delay, true);
  const debouncedJsonpath = useDebouncedValue(jsonpath, delay, true);

  useEffect(() => {
    validateJson(debouncedInput, jsonpath).then((result) => setOutput(result));
  }, [debouncedInput, debouncedJsonpath]);

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
        <TextArea
          color="red"
          className="grow whitespace-pre-wrap"
          value={output}
        />
        <TextField.Input
          placeholder="JSON Path: (e.g., $.store.book[0].title)"
          value={jsonpath}
          onChange={(e) => setJsonpath(e.target.value)}
        />
      </Flex>
    </Grid>
  );
}
