// @ts-ignore
import yaml from 'js-yaml';
import { JSONPath } from 'jsonpath-plus';

import toml, { JsonMap } from '@iarna/toml';

import { isTauri } from '@/utils/index';

export enum StringType {
  JavaScriptObject = 'JavaScript Object',
  JSONString = 'JSON String',
}

export function Json2Yaml(json: object): string {
  return yaml.dump(json, { indent: 2 });
}

export function Json2Toml(json: object): string {
  return toml.stringify(json as JsonMap);
}

export function Yaml2Json(yamlString: string) {
  return yaml.load(yamlString) as object;
}

export function Yaml2Toml(yamlString: string) {
  return Json2Toml(Yaml2Json(yamlString));
}

export function Toml2Yaml(tomlString: string) {
  return Json2Yaml(Toml2Json(tomlString));
}

export function Toml2Json(tomlString: string) {
  return toml.parse(tomlString);
}

export async function validateJson(
  stringToValidate: string,
  stringType: StringType,
  jsonpath?: string,
): Promise<string> {
  if (isTauri()) {
    if (stringType === StringType.JavaScriptObject) {
      stringToValidate = eval('(' + stringToValidate + ')');
    }
    return await (
      await import('@tauri-apps/api')
    ).invoke('validate_json', {
      stringToValidate,
      path: !!jsonpath ? jsonpath : undefined, // empty string should be undefined
    });
  }
  try {
    const parsed =
      stringType === StringType.JavaScriptObject
        ? eval('(' + stringToValidate + ')')
        : JSON.parse(stringToValidate);
    console.log(parsed);
    const result = jsonpath
      ? JSONPath({ path: jsonpath, json: parsed })
      : parsed;
    return JSON.stringify(result, null, 2);
  } catch (e) {
    if (e instanceof SyntaxError) {
      return e.message;
    }
    return 'Unknown error';
  }
}
