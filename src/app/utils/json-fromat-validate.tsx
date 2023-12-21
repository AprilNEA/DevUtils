'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import {
  Flex,
  Grid,
  Select,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';

import Setting, { delayAtom } from '@/app/setting';
import CopyButton from '@/components/buttons/copy';
import ToolBar from '@/components/tool-bar';
import { StringType, validateJson } from '@/utils/json';

export function JSONFormatValidate() {
  const [delay] = useAtom(delayAtom);

  const [stringType, setStringType] = useState(StringType.JSONString);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [outputError, setOutputError] = useState('');
  const [jsonpath, setJsonpath] = useState('');

  // debounce input to delay update
  const debouncedInput = useDebouncedValue(input, delay, true);
  const debouncedJsonpath = useDebouncedValue(jsonpath, delay, true);

  useEffect(() => {
    validateJson(debouncedInput, stringType, jsonpath).then((result) =>
      setOutput(result),
    );
  }, [debouncedInput, stringType, debouncedJsonpath]);

  return (
    <Grid className="h-full" columns="2" gap="3" width="auto">
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" justify="start" align="center" gap="2">
            <Text>Input</Text>
            <Select.Root
              size="1"
              onValueChange={(v) => setStringType(v as StringType)}
              defaultValue={StringType.JSONString}
            >
              <Select.Trigger />
              <Select.Content>
                {Object.entries(StringType).map(([key, value]) => (
                  <Select.Item key={key} value={value}>
                    {value}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
            <ToolBar
              input={input}
              setInput={setInput}
              clear={() => setInput('{}')}
            />
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
          onChange={(e) => setInput(e.target.value)}
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
