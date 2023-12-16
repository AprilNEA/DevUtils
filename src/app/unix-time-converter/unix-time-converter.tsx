'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { proxy, useSnapshot } from 'valtio';

import { Card, Flex, Grid, Separator, Text, TextField } from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';
import { Input, LabelInput } from '@/components/input';
import ToolBar from '@/components/tool-bar';

const state = proxy({
  date: moment(),
  get timestamp(): string {
    return this.date.toString();
  },
  get utc(): string {
    return this.date.toISOString();
  },
  get local(): string {
    return this.date.toLocaleString();
  },
  get unix(): number {
    return this.date.unix();
  },
  get relative(): string {
    return moment(this.date).fromNow();
  },
});

export default function UnixTimeConverter() {
  const snap = useSnapshot(state, { sync: true });

  return (
    <Flex
      direction="column"
      justify="start"
      align="start"
      className="h-full"
      gap="2"
    >
      <Flex direction="row" justify="start" align="start" gap="2">
        <Text>Input</Text>
        <ToolBar
          input={snap.timestamp}
          setInput={(v) => {
            state.date = moment(v);
          }}
          clear={() => (state.date = moment())}
        />
      </Flex>

      <div>
        <Input
          value={snap.date.unix()}
          onChange={(e) => (state.date = moment(e.target.value))}
          className="w-48"
        />
      </div>
      <Separator size="4" />
      <Flex direction="row" gap="4">
        <Flex direction="column" gap="2">
          <LabelInput
            label="Local"
            value={snap.local}
            onChange={(e) => {
              state.date = moment(e.target.value);
            }}
            className="w-72"
          />
          <LabelInput
            label="UTC (ISO 8601)"
            value={snap.utc}
            onChange={(e) => {
              state.date = moment(e.target.value);
            }}
            className="w-72"
          />
          <LabelInput label="Relative" value={snap.relative} className="w-72" />
          <LabelInput label="Unix time" value={snap.unix} className="w-72" />
        </Flex>
        <Flex direction="column" gap="2">
          <LabelInput
            label="Weekday"
            value={snap.date.weekday()}
            className="w-24"
          />
          <LabelInput
            label="Day of year"
            value={snap.date.dayOfYear()}
            onChange={(e) => {
              state.date.set('dayOfYear', parseInt(e.target.value));
            }}
            className="w-24"
          />
          <LabelInput
            label="Week of year"
            value={snap.date.weeksInYear()}
            onChange={(e) => {
              state.date.set('weekYears', parseInt(e.target.value));
            }}
            className="w-24"
          />
        </Flex>
        <Flex direction="column" gap="2">
          {/*<LabelInput*/}
          {/*  label="Day of year"*/}
          {/*  value={snap.local}*/}
          {/*  onChange={(e) => {*/}
          {/*    state.value = new Date(e.target.value).getTime();*/}
          {/*  }}*/}
          {/*  className="w-72"*/}
          {/*/>*/}
          {/*<Input value={snap.utc} className="w-72" />*/}
          {/*<Input value={snap.relative} className="w-72" />*/}
        </Flex>
      </Flex>
    </Flex>
  );
}
