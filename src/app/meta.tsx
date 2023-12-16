import { atom } from 'jotai';
import { Metadata } from 'next';

import { ClockIcon, JsonIcon, JwtIcon } from '@/icons';

export enum Utils {
  UnixTimeConverter = 'unix-time-converter',
  JSONFormatValidate = 'json-format-validate',
  JwtDebugger = 'jwt-debugger',
}

type metaProps = {
  title: string;
  icon: JSX.ElementType;
};

const meta: {
  [key in Utils as string]: metaProps;
} = {
  'unix-time-converter': {
    title: 'Unix Time Converter',
    icon: ClockIcon,
  },
  'json-format-validate': {
    title: 'JSON Format/Validate',
    icon: JsonIcon,
  },
  'jwt-debugger': {
    title: 'JWT Debugger',
    icon: JwtIcon,
  },
};

export const getWebMeta = (key: Utils): Metadata => {
  return {
    title: `${meta[key].title} | DevUtils`,
  };
};

export default meta;
