'use client';

import { useDebouncedValue } from 'foxact/use-debounced-value';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';

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
import CodeEditor from '@/components/code-editor';
import ToolBar from '@/components/tool-bar';
import {
  Json2Toml,
  Json2Yaml,
  StringType,
  Toml2Json,
  Toml2Yaml,
  Yaml2Json,
  Yaml2Toml,
} from '@/utils/json';

export function JsonYamlTomlConvert() {
  const [delay] = useAtom(delayAtom);

  const [changed, setChanged] = useState<'json' | 'yaml' | 'toml'>();
  const [json, setJson] = useState('');
  const [toml, setToml] = useState('');
  const [yaml, setYaml] = useState('');

  // debounce input to delay update
  const debouncedChanged = useDebouncedValue(changed, delay, true);

  const onChange = useCallback((v: string) => {
    setJson(v);
    setChanged('json');
  }, []);

  useEffect(() => {
    setChanged(undefined);
    try {
      switch (debouncedChanged) {
        case 'json':
          const parsed = JSON.parse(json);
          setYaml(Json2Yaml(parsed));
          setToml(Json2Toml(parsed));
          break;
        case 'yaml':
          setJson(JSON.stringify(Yaml2Json(yaml), null, 2));
          setToml(Yaml2Toml(yaml));
          break;
        case 'toml':
          setJson(JSON.stringify(Toml2Json(toml), null, 2));
          setYaml(Toml2Yaml(toml));
          break;
        default:
          break;
      }
    } catch (e) {}
  }, [debouncedChanged]);

  return (
    <Grid className="h-full" columns="3" gap="3" width="auto">
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Flex direction="row" justify="start" align="center" gap="2">
            <Text>JSON</Text>
            <ToolBar
              input={json}
              setInput={setJson}
              clear={() => {
                setJson('');
                setToml('');
                setYaml('');
              }}
            />
          </Flex>
        </Flex>

        <CodeEditor
          value={json}
          language="json"
          onChange={useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
            (e) => {
              setJson(e.target.value);
              setChanged('json');
            },
            [],
          )}
        />
      </Flex>
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Text>YAML</Text>
          <CopyButton valueToCopy={yaml} />
        </Flex>
        <CodeEditor
          value={yaml}
          language="yaml"
          onChange={useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
            (e) => {
              setYaml(e.target.value);
              setChanged('yaml');
            },
            [],
          )}
        />
      </Flex>
      <Flex direction="column" className="h-full gap-y-2">
        <Flex direction="row" justify="between" align="center">
          <Text>TOML</Text>
          <CopyButton valueToCopy={toml} />
        </Flex>
        <CodeEditor
          value={toml}
          language="toml"
          onChange={useCallback<React.ChangeEventHandler<HTMLTextAreaElement>>(
            (e) => {
              setToml(e.target.value);
              setChanged('toml');
            },
            [],
          )}
        />
      </Flex>
    </Grid>
  );
}
