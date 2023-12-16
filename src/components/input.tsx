import clsx from 'clsx';

import { TextField } from '@radix-ui/themes';

type InputProps = React.ComponentProps<typeof TextField.Input> & {
  icon?: React.ReactNode;
  rootClassName?: string;
};

type LabelInputProps = InputProps & {
  label: string;
};

const inputClasses = 'shadow';

export function Input({
  icon,
  rootClassName,
  className,
  ...inputProps
}: InputProps) {
  return icon ? (
    <TextField.Root className={clsx(rootClassName, inputClasses)}>
      {icon && <TextField.Slot>{icon}</TextField.Slot>}
      <TextField.Input className={clsx(className)} {...inputProps} />
    </TextField.Root>
  ) : (
    <TextField.Input
      className={clsx(className, inputClasses)}
      {...inputProps}
    />
  );
}

export function LabelInput({ label, ...inputProps }: LabelInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <Input {...inputProps} />
    </div>
  );
}
