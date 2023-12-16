import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { Box, Button, Flex, Popover, Text, TextField } from '@radix-ui/themes';

import { SettingIcon } from '@/icons';

export const delayAtom = atomWithStorage('delay', 300);

export default function Setting() {
  const [delay, setDelay] = useAtom(delayAtom);
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="1" variant="outline">
          <SettingIcon className="h-[16px] w-[16px]" />
        </Button>
      </Popover.Trigger>
      <Popover.Content>
        <Flex gap="3">
          <Box grow="1">
            <Flex direction="row" justify="start" align="center" gap="2">
              <Text as="label" size="2">
                <Text>Delay: </Text>
              </Text>
              <TextField.Input
                value={delay}
                onChange={(e) => setDelay(parseInt(e.target.value))}
              />
            </Flex>
            <Popover.Close>
              <Button size="1">Comment</Button>
            </Popover.Close>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
}
