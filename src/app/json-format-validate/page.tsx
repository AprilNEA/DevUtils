'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useEffect, useState } from 'react';

import { Box, Code, Flex, Grid, Text, TextArea } from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';

export default function JSONFormatValidate() {
  const [input, setInput] = useState('');

  const debouncedUserInput = useDebouncedValue(input, 300, true);
  const [output, setOutput] = useState('');
  useEffect(() => {
    try {
      setOutput(JSON.stringify(JSON.parse(debouncedUserInput), null, 2));
    } catch (e) {
      setOutput(JSON.stringify(e));
    }
  }, [debouncedUserInput]);

  return (
    <Grid className="h-full" columns="2" gap="3" width="auto">
      <Flex direction="column" className="h-full">
        <Flex>
          <Text>Input</Text>
        </Flex>

        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="h-full"
        />
      </Flex>
      <Flex direction="column" className="h-full">
        <Flex direction="row" justify="between" align="center">
          <Text>Input</Text>
          <CopyButton valueToCopy={output} />
        </Flex>
        <Box height="100%">
          <Code>{output}</Code>
        </Box>
      </Flex>
    </Grid>
  );
}
