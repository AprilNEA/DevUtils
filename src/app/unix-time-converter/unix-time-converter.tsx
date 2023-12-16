'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import moment from 'moment';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { Card, Flex, Grid, Separator, Text, TextField } from '@radix-ui/themes';

import CopyButton from '@/components/buttons/copy';
import { Input, LabelInput } from '@/components/input';
import ToolBar from '@/components/tool-bar';

export default function UnixTimeConverter() {
  const [date, _setDate] = useState(moment());

  const property = useMemo(
    () => ({
      timestamp: date.unix(),
      local: date.toLocaleString(),
      utc: date.toISOString(),
      unix: date.unix(),
      relative: moment(date).fromNow(),
      weekOfYear: date.weeks(),
      dayOfYear: date.dayOfYear(),
      weekday: date.weekday(),
    }),
    [date],
  );

  const setDate = (e: ChangeEvent<HTMLInputElement>) => {
    _setDate(moment(e.target.value));
  };

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
          input={property.timestamp}
          setInput={(e) => _setDate(moment(e))}
          clear={() => _setDate(moment())}
        />
      </Flex>

      <div>
        <Input value={property.timestamp} onChange={setDate} className="w-48" />
      </div>
      <Separator size="4" />
      <Flex direction="row" gap="4">
        <Flex direction="column" gap="2">
          <LabelInput
            label="Local"
            value={property.local}
            onChange={setDate}
            className="w-72"
          />
          <LabelInput
            label="UTC (ISO 8601)"
            value={property.utc}
            onChange={setDate}
            className="w-72"
          />
          <LabelInput
            label="Relative"
            value={property.relative}
            className="w-72"
          />
          <LabelInput
            label="Unix time"
            value={property.unix}
            className="w-72"
          />
        </Flex>
        <Flex direction="column" gap="2">
          <LabelInput
            label="Weekday"
            value={property.weekday}
            onChange={(e) => {}}
            className="w-24"
          />
          <LabelInput
            label="Day of year"
            value={property.dayOfYear}
            onChange={(e) => {
              date.set('dayOfYear', parseInt(e.target.value));
            }}
            className="w-24"
          />
          <LabelInput
            label="Week of year"
            value={property.weekOfYear}
            onChange={(e) => {
              date.set('weeks', parseInt(e.target.value));
              _setDate(date.clone());
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
