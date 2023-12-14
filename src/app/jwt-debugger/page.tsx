'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useEffect, useState } from 'react';

import { Card, Flex, Grid, Separator, Text, TextArea } from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';
import ToolBar from '@/components/tool-bar';

interface JWT {
  header: any;
  payload: any;
  signature: string;
}

function parseJWT(jwt: string): JWT {
  const [header, payload, signature] = jwt.split('.');
  return {
    header: JSON.stringify(JSON.parse(atob(header)), null, 2),
    payload: JSON.stringify(JSON.parse(atob(payload)), null, 2),
    signature,
  };
}

export default function JWTDebugger() {
  const [input, setInput] = useState('');

  const debouncedUserInput = useDebouncedValue(input, 300, true);
  const [output, setOutput] = useState<JWT>({
    header: '{}',
    payload: '{}',
    signature: '',
  });
  useEffect(() => {
    try {
      setOutput(parseJWT(debouncedUserInput));
    } catch (e) {
      // setOutput();
    }
  }, [debouncedUserInput]);

  return (
    <Grid className="h-full" columns="2" gap="3" width="auto">
      <Flex direction="column" className="h-full" gap="2">
        <Flex direction="row" justify="start" align="center" gap="2">
          <Text>Input</Text>
          <ToolBar input={input} setInput={setInput} />
        </Flex>

        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full"
        />
      </Flex>
      <Flex direction="column" className="h-full" gap="2">
        <Flex direction="row" justify="between" align="center">
          <Text>Header: </Text>
          <CopyButton valueToCopy={output.header} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{output.header}</Card>
        <Separator size="4" />
        <Flex direction="row" justify="between" align="center">
          <Text>Payload: </Text>
          <CopyButton valueToCopy={output.payload} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{output.payload}</Card>
        <Separator size="4" />
        <Flex direction="row" justify="between" align="center">
          <Text>Signature: </Text>
          <CopyButton valueToCopy={output.signature} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{output.signature}</Card>
      </Flex>
    </Grid>
  );
}
