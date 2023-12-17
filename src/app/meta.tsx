import { Metadata } from 'next';

import {
  Base64Icon,
  Base64ImageIcon,
  ClockIcon,
  ConversionIcon,
  JsonIcon,
  JwtIcon,
} from '@/icons';

export enum Utils {
  // CurlToCode = 'curl-to-code',
  JSONFormatValidate = 'json-format-validate',
  UnixTimeConverter = 'unix-time-converter',
  Base64StringEncodeDecode = 'base64-string-encode-decode',
  Base64ImageEncodeDecode = 'base64-image-encode-decode',
  jsonYamlTomlConverter = 'json-yaml-toml-convert',
  JwtDebugger = 'jwt-debugger',
}

type MetaProps = {
  name: string;
  title?: string;
  icon: JSX.ElementType;
  description?: string;
};

const meta: {
  [key in Utils as string]: MetaProps;
} = {
  // [Utils.CurlToCode]: {
  //   title: 'Curl to Code',
  //   icon: ClockIcon,
  // },
  [Utils.JSONFormatValidate]: {
    name: 'JSON Format/Validate',
    icon: JsonIcon,
    description:
      'Efficient, user-friendly tool for formatting, validating, and optimizing JSON or JSON-like(Python-Dict) data.',
  },
  [Utils.UnixTimeConverter]: {
    name: 'Unix Time Converter',
    icon: ClockIcon,
    description:
      'Quick, accurate tool for converting Unix time to human-readable dates.',
  },
  [Utils.Base64StringEncodeDecode]: {
    name: 'Base64 String Encode/Decode',
    icon: Base64Icon,
    description:
      'Efficient tool for encoding and decoding strings in Base64 format.',
  },
  [Utils.Base64ImageEncodeDecode]: {
    name: 'Base64 Image Encode/Decode',
    icon: Base64ImageIcon,
    description:
      'Efficient tool for encoding and decoding strings in Base64 Image format.',
  },
  [Utils.jsonYamlTomlConverter]: {
    name: 'JSON ↔ YAML ↔ TOML',
    title: 'JSON/YAML/TOML Online Converter',
    icon: ConversionIcon,
    description:
      'An efficient tool designed for quick and accurate conversion between JSON, YAML, and TOML formats.',
  },
  [Utils.JwtDebugger]: {
    name: 'JWT Debugger',
    icon: JwtIcon,
    description:
      'Reliable JWT Debugger for decoding, verifying, and debugging JSON Web Tokens.',
  },
};

export const getWebMeta = (key: Utils): Metadata => {
  return {
    title: `${
      meta[key]?.title ?? meta[key]?.name + '  Online Tools'
    } | DevUtils`,
    description: meta[key]?.description,
  };
};

export default meta;
