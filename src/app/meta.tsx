import { Metadata } from 'next';

import { Base64ImageEncodeDecode } from '@/app/utils/base64-image-encode-decode';
import { Base64StringEncodeDecode } from '@/app/utils/base64-string-encode-decode';
import { GptTokenizer } from '@/app/utils/gpt-tokenizer';
import { JSONFormatValidate } from '@/app/utils/json-fromat-validate';
import { JsonYamlTomlConvert } from '@/app/utils/json-yaml-toml-convert';
import JWTDebugger from '@/app/utils/jwt-debugger';
import UnixTimeConverter from '@/app/utils/unix-time-converter';
import {
  Base64Icon,
  Base64ImageIcon,
  ChipIcon,
  ClockIcon,
  ConversionIcon,
  ConvertIcon,
  EncodeIcon,
  FormatterIcon,
  GeneratorIcon,
  GraphicIcon,
  JsonIcon,
  JwtIcon,
  TextIcon,
} from '@/icons';

export enum Categories {
  Converters = 'converters',
  EncodersDecoders = 'encoders-decoders',
  Formatters = 'formatters',
  Generators = 'generators',
  Analysts = 'analysts',
  Text = 'text',
  Graphic = 'graphic',
}

export enum Utils {
  /* Converters */
  JsonYamlTomlConverter = 'json-yaml-toml-convert',
  UnixTimeConverter = 'unix-time-converter',
  // CurlToCode = 'curl-to-code',

  /*EncodersDecoders*/
  Base64StringEncodeDecode = 'base64-string-encode-decode',
  Base64ImageEncodeDecode = 'base64-image-encode-decode',
  JwtDebugger = 'jwt-debugger',

  /* Formatters */
  JSONFormatValidate = 'json-format-validate',

  /* Analysts */
  GptTokenizer = 'gpt-tokenizer',
}

type UtilsProps = {
  name: string;
  title?: string;
  icon: JSX.ElementType;
  description?: string;
  component: React.ReactNode;
};

export const META_UTILS: {
  [key in Utils]: UtilsProps;
} = {
  /* Converters */
  [Utils.JSONFormatValidate]: {
    name: 'JSON Format/Validate',
    icon: JsonIcon,
    description:
      'Efficient, user-friendly tool for formatting, validating, and optimizing JSON or JSON-like(Python-Dict) data.',
    component: <JSONFormatValidate />,
  },
  [Utils.UnixTimeConverter]: {
    name: 'Unix Time Converter',
    icon: ClockIcon,
    description:
      'Quick, accurate tool for converting Unix time to human-readable dates.',
    component: <UnixTimeConverter />,
  },
  // [Utils.CurlToCode]: {
  //   title: 'Curl to Code',
  //   icon: ClockIcon,
  // },
  /* EncodersDecoders */
  [Utils.Base64StringEncodeDecode]: {
    name: 'Base64 String Encode/Decode',
    icon: Base64Icon,
    description:
      'Efficient tool for encoding and decoding strings in Base64 format.',
    component: <Base64StringEncodeDecode />,
  },
  [Utils.Base64ImageEncodeDecode]: {
    name: 'Base64 Image Encode/Decode',
    icon: Base64ImageIcon,
    description:
      'Efficient tool for encoding and decoding strings in Base64 Image format.',
    component: <Base64ImageEncodeDecode />,
  },
  [Utils.JwtDebugger]: {
    name: 'JWT Debugger',
    icon: JwtIcon,
    description:
      'Reliable JWT Debugger for decoding, verifying, and debugging JSON Web Tokens.',
    component: <JWTDebugger />,
  },

  /* Formatters */
  [Utils.JsonYamlTomlConverter]: {
    name: 'JSON ↔ YAML ↔ TOML',
    title: 'JSON/YAML/TOML Online Converter',
    icon: ConversionIcon,
    description:
      'An efficient tool designed for quick and accurate conversion between JSON, YAML, and TOML formats.',
    component: <JsonYamlTomlConvert />,
  },

  /* Analysts */
  [Utils.GptTokenizer]: {
    name: 'GPT Tokenizer',
    icon: ChipIcon,
    description: '',
    component: <GptTokenizer />,
  },
};

export const METADATA: {
  [key in Categories]: {
    name: string;
    icon: JSX.ElementType;
    utils: Partial<{ [key in Utils]: UtilsProps }>;
  };
} = {
  [Categories.Converters]: {
    name: 'Converters',
    icon: ConvertIcon,
    utils: {
      [Utils.JsonYamlTomlConverter]: META_UTILS[Utils.JsonYamlTomlConverter],
      [Utils.UnixTimeConverter]: META_UTILS[Utils.UnixTimeConverter],
    },
  },
  [Categories.EncodersDecoders]: {
    name: 'Encoders/Decoders',
    icon: EncodeIcon,
    utils: {
      [Utils.Base64StringEncodeDecode]:
        META_UTILS[Utils.Base64StringEncodeDecode],
      [Utils.Base64ImageEncodeDecode]:
        META_UTILS[Utils.Base64ImageEncodeDecode],
      [Utils.JwtDebugger]: META_UTILS[Utils.JwtDebugger],
    },
  },
  [Categories.Formatters]: {
    name: 'Formatters',
    icon: FormatterIcon,
    utils: {
      [Utils.JSONFormatValidate]: META_UTILS[Utils.JSONFormatValidate],
    },
  },
  [Categories.Generators]: {
    name: 'Generators',
    icon: GeneratorIcon,
    utils: {},
  },
  [Categories.Analysts]: {
    name: 'Analysts',
    icon: ChipIcon,
    utils: {
      [Utils.GptTokenizer]: META_UTILS[Utils.GptTokenizer],
    },
  },
  [Categories.Text]: {
    name: 'Text',
    icon: TextIcon,
    utils: {},
  },
  [Categories.Graphic]: {
    name: 'Graphic',
    icon: GraphicIcon,
    utils: {},
  },
};

export default METADATA;
