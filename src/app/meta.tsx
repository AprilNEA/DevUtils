import { JsonIcon, JwtIcon } from '@/icons';

const meta: {
  [key: string]: {
    title: string;
    icon: JSX.ElementType;
  };
} = {
  'json-format-validate': {
    title: 'JSON Format/Validate',
    icon: JsonIcon,
  },
  'jwt-debugger': {
    title: 'JWT Debugger',
    icon: JwtIcon,
  },
} as const;

export default meta;
