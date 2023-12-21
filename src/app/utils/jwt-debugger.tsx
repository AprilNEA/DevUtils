'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useEffect, useState } from 'react';
import { proxy, useSnapshot } from 'valtio';

import { Card, Flex, Grid, Separator, Text, TextArea } from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';
import ToolBar from '@/components/tool-bar';

const state = proxy({
  jwt: '',
  get raw(): {
    header: string;
    payload: string;
    signature: string;
  } {
    const parsed = this.jwt.split('.');
    return {
      header: parsed[0],
      payload: parsed[1],
      signature: parsed[2],
    };
  },
  get header(): string {
    try {
      return JSON.stringify(JSON.parse(atob(this.raw.header)), null, 2);
    } catch (e) {
      return '{}';
    }
  },
  get payload(): string {
    try {
      return JSON.stringify(JSON.parse(atob(this.raw.payload)), null, 2);
    } catch (e) {
      return '{}';
    }
  },
  get signature(): string {
    return this.raw.signature ?? '';
  },
});

export default function JWTDebugger() {
  const snap = useSnapshot(state, { sync: true });

  return (
    <Grid className="h-full" columns="2" gap="3" width="auto">
      <Flex direction="column" className="h-full" gap="2">
        <Flex direction="row" justify="start" align="center" gap="2">
          <Text>Input</Text>
          <ToolBar
            input={snap.jwt}
            setInput={(v) => {
              state.jwt = v;
            }}
          />
        </Flex>

        <TextArea
          value={snap.jwt}
          onChange={(e) => {
            state.jwt = e.target.value;
          }}
          className="h-full"
        />
      </Flex>
      <Flex direction="column" className="h-full" gap="2">
        <Flex direction="row" justify="between" align="center">
          <Text>Header: </Text>
          <CopyButton valueToCopy={snap.header} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{snap.header}</Card>
        <Separator size="4" />
        <Flex direction="row" justify="between" align="center">
          <Text>Payload: </Text>
          <CopyButton valueToCopy={snap.payload} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{snap.payload}</Card>
        <Separator size="4" />
        <Flex direction="row" justify="between" align="center">
          <Text>Signature: </Text>
          <CopyButton valueToCopy={snap.signature} />
        </Flex>
        <Card className="grow whitespace-pre-wrap">{snap.signature}</Card>
      </Flex>
    </Grid>
  );
}
