'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';

import { Flex, RadioGroup, Text, TextArea, TextField } from '@radix-ui/themes';

import { delayAtom } from '@/app/setting';
import ToolBar from '@/components/tool-bar';

function Encode(input: string): string {
  try {
    return btoa(input);
  } catch (e) {
    return 'Invalid input';
  }
}

function Decode(input: string): string {
  try {
    return atob(input);
  } catch (e) {
    return (e as any)?.message ?? 'Invalid input';
  }
}

export function Base64StringEncodeDecode() {
  const [delay] = useAtom(delayAtom);

  const [type, setType] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // debounce input to delay update
  const debouncedEncode = useDebouncedValue(input, delay, true);

  const handle = (v: string, reserve = false) => {
    const action = (type === 'encode') !== reserve ? Encode : Decode;
    return action(v);
  };

  useEffect(() => {
    const newOutput = handle(debouncedEncode);
    if (newOutput !== output) setOutput(newOutput);
  }, [debouncedEncode]);

  return (
    <Flex direction="column" className="h-full gap-y-2">
      <Flex
        direction="row"
        justify="start"
        align="center"
        gap="4"
        className="w-full"
      >
        <Text>Input</Text>
        <Flex
          direction="row"
          justify="between"
          align="center"
          gap="2"
          className="w-full"
        >
          <ToolBar
            input={input}
            setInput={setInput}
            clear={() => setInput('')}
          />
          <RadioGroup.Root
            size="1"
            highContrast
            onValueChange={(e) => setType(e as 'encode' | 'decode')}
            defaultValue="encode"
          >
            <Flex gap="2" direction="row">
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item value="encode" /> Encode
                </Flex>
              </Text>
              <Text as="label" size="2">
                <Flex gap="2">
                  <RadioGroup.Item value="decode" /> Decode
                </Flex>
              </Text>
            </Flex>
          </RadioGroup.Root>
        </Flex>
      </Flex>

      <TextArea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-full"
      />
      <Text>Output</Text>
      <TextArea
        value={output}
        onChange={(e) => {
          setOutput(e.target.value);
          setInput(handle(e.target.value, true));
        }}
        className="h-full"
      />
    </Flex>
  );
}
