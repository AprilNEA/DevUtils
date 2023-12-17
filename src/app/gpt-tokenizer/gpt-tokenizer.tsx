'use client';

import { useClipboard } from 'foxact/use-clipboard';
import { useDebouncedValue } from 'foxact/use-debounced-value';
import cl100k_base from 'gpt-tokenizer/encoding/cl100k_base';
import p50k_base from 'gpt-tokenizer/encoding/p50k_base';
import p50k_edit from 'gpt-tokenizer/encoding/p50k_edit';
import r50k_base from 'gpt-tokenizer/encoding/r50k_base';
import { useAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';

import {
  Code,
  Flex,
  Grid,
  RadioGroup,
  Select,
  Strong,
  Text,
  TextArea,
} from '@radix-ui/themes';

import { delayAtom } from '@/app/setting';
import ToolBar from '@/components/tool-bar';

type Encoding = 'cl100k_base' | 'p50k_base' | 'p50k_edit' | 'r50k_base';

const tokenizers = {
  cl100k_base,
  p50k_base,
  r50k_base,
  p50k_edit,
};

const MODEL: Record<string, Record<string, string>> = {
  chat: {
    'gpt-4-32k': 'cl100k_base',
    'gpt-4-0314': 'cl100k_base',
    'gpt-4-32k-0314': 'cl100k_base',
    'gpt-3.5-turbo': 'cl100k_base',
    'gpt-3.5-turbo-0301': 'cl100k_base',
  },
  text_only: {
    'text-davinci-003': 'p50k_base',
    'text-davinci-002': 'p50k_base',
    'text-davinci-001': 'r50k_base',
    'text-curie-001': 'r50k_base',
    'text-babbage-001': 'r50k_base',
    'text-ada-001': 'r50k_base',
    davinci: 'r50k_base',
    curie: 'r50k_base',
    babbage: 'r50k_base',
    ada: 'r50k_base',
  },
  code: {
    'code-davinci-002': 'p50k_base',
    'code-davinci-001': 'p50k_base',
    'code-cushman-002': 'p50k_base',
    'code-cushman-001': 'p50k_base',
    'davinci-codex': 'p50k_base',
    'cushman-codex': 'p50k_base',
  },
  edit: {
    'text-davinci-edit-001': 'p50k_edit',
    'code-davinci-edit-001': 'p50k_edit',
  },
  embeddings: {
    'text-embedding-ada-002': 'cl100k_base',
  },
  old_embeddings: {
    'text-similarity-davinci-001': 'r50k_base',
    'text-similarity-curie-001': 'r50k_base',
    'text-similarity-babbage-001': 'r50k_base',
    'text-similarity-ada-001': 'r50k_base',
    'text-search-davinci-doc-001': 'r50k_base',
    'text-search-curie-doc-001': 'r50k_base',
    'text-search-babbage-doc-001': 'r50k_base',
    'text-search-ada-doc-001': 'r50k_base',
    'code-search-babbage-code-001': 'r50k_base',
    'code-search-ada-code-001': 'r50k_base',
  },
} as const;

const getEncoding = (key: string): Encoding => {
  for (const category in MODEL) {
    if (MODEL[category][key]) {
      return MODEL[category][key] as Encoding;
    }
  }
  return 'cl100k_base';
};

const SelectModel: React.FC<{
  value: string;
  setValue: (v: string) => void;
}> = (props) => {
  return (
    <Select.Root
      size="1"
      value={props.value}
      onValueChange={(v) => props.setValue(v)}
    >
      <Select.Trigger />
      <Select.Content>
        {Object.entries(MODEL).map(([category, items], index) => (
          <>
            <Select.Group key={category}>
              <Select.Label>{category}</Select.Label>
              {Object.entries(items).map(([model, value]) => (
                <Select.Item key={model} value={model}>
                  {model}
                </Select.Item>
              ))}
            </Select.Group>
            {index + 1 !== Object.keys(MODEL).length && <Select.Separator />}
          </>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

const monospace = `"Roboto Mono",sfmono-regular,consolas,liberation mono,menlo,courier,monospace`;
const pastelColors = [
  'rgba(107,64,216,.3)',
  'rgba(104,222,122,.4)',
  'rgba(244,172,54,.4)',
  'rgba(239,65,70,.4)',
  'rgba(39,181,234,.4)',
];

const TokenizedText = ({ tokens }: { tokens: (string | number)[] }) => (
  <div
    style={{
      display: 'flex',
      flexWrap: 'wrap',
      fontFamily: monospace,
      width: '100%',
      height: '100%',
      // flexGrow: 1,
      overflowY: 'auto',
      padding: '8px',
      border: '1px solid #ccc',
      backgroundColor: '#f8f8f8',
      lineHeight: '1.5',
      alignContent: 'flex-start',
    }}
  >
    {tokens.map((token, index) => (
      <span
        key={index}
        style={{
          backgroundColor: pastelColors[index % pastelColors.length],
          padding: '0 0px',
          borderRadius: '3px',
          marginRight: '0px',
          marginBottom: '4px',
          display: 'inline-block',
          height: '1.5em',
        }}
      >
        {
          <pre>
            {String(token)
              .replaceAll(' ', '\u00A0')
              .replaceAll('\n', '<newline>')}
          </pre>
        }
      </span>
    ))}
  </div>
);

export function GptTokenizer() {
  // const [delay] = useAtom(delayAtom);

  const [selectedModel, setSelectedModel] = useState<string>('gpt-4-32k');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  // debounce input to delay update
  // const debouncedEncode = useDebouncedValue(input, delay, true);

  const api = useMemo(
    () => tokenizers[getEncoding(selectedModel)],
    [selectedModel],
  );
  const encodedTokens = api.encode(input);
  const decodedTokens = useMemo(() => {
    const tokens = [];
    for (const token of api.decodeGenerator(encodedTokens)) {
      tokens.push(token);
    }
    return tokens;
  }, [encodedTokens, api]);

  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      className="h-full w-full"
      gap="4"
    >
      <Flex
        direction="column"
        justify="start"
        align="start"
        className="basis-1/2 h-full w-full"
        gap="2"
      >
        <Flex
          direction="row"
          justify="start"
          align="center"
          gap="4"
          className="w-full"
        >
          <Text>Input</Text>
          <Code>
            Characters: <Strong>{input.length}</Strong>
          </Code>
          <SelectModel value={selectedModel} setValue={setSelectedModel} />
          <ToolBar
            input={input}
            setInput={setInput}
            clear={() => setInput('')}
          />
        </Flex>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="grow w-full"
        />
      </Flex>
      <Flex
        direction="column"
        justify="start"
        align="start"
        className="basis-1/2 h-full w-full"
        gap="2"
      >
        <Flex
          direction="row"
          justify="start"
          align="center"
          gap="4"
          className="w-full"
        >
          <Text>Output:</Text>
          <Code>
            Tokens: <Strong>{encodedTokens.length}</Strong>
          </Code>
        </Flex>
        <div className="grow w-full">
          <TokenizedText tokens={decodedTokens} />
        </div>
      </Flex>
    </Flex>
  );
}
