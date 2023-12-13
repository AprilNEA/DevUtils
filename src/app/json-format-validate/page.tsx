"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Code,
  Flex,
  Grid,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useDebouncedValue } from "foxact/use-debounced-value";
import CopyButton from "@/components/buttons/copy";

export default function JSONFormatValidate() {
  const [userInput, setUserInput] = useState("");

  const debouncedUserInput = useDebouncedValue(userInput, 300, true);
  const [output, setOutput] = useState("");
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
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
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
