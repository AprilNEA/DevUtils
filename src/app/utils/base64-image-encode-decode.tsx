'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Text,
  TextArea,
} from '@radix-ui/themes';

import ToolBar from '@/components/tool-bar';
import { Logo } from '@/icons';

function convertToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error.type);
  });
}

export function Base64ImageEncodeDecode() {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const [base64, setBase64] = useState('');

  const imgSrc = useMemo(
    () =>
      base64.startsWith('data:image/')
        ? base64
        : `data:image/jpeg;base64,${base64}`,
    [base64],
  );

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      convertToBase64(file).then((result) => setBase64(result));
    }
  };

  return (
    <Grid columns="2" gap="2" className="h-full">
      <Flex
        direction="column"
        justify="start"
        align="center"
        gap="2"
        className="w-full"
      >
        <Flex
          direction="row"
          justify="between"
          align="center"
          gap="2"
          className="w-full"
        >
          <Text>String: </Text>
          <ToolBar
            input={base64}
            setInput={setBase64}
            clear={() => setBase64('')}
          />
        </Flex>
        <TextArea
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          className="h-full w-full"
        />
      </Flex>
      <Flex
        direction="column"
        justify="start"
        align="center"
        gap="2"
        className="w-full"
      >
        <Flex
          direction="row"
          justify="between"
          align="center"
          gap="2"
          className="w-full"
        >
          <Text>Image: </Text>
          <Button
            size="1"
            variant="outline"
            onClick={() => hiddenFileInput.current?.click()}
          >
            Upload
          </Button>
          <input
            ref={hiddenFileInput}
            type="file"
            className="hidden"
            onChange={uploadImage}
          />
        </Flex>
        <Box className="h-full w-full flex justify-center items-center border rounded-md bg-white">
          {!!base64 ? (
            <img src={imgSrc} alt="Base64 Image" className="w-fit h-fit" />
          ) : (
            <Logo className="w-12 h-12" />
          )}
        </Box>
      </Flex>
    </Grid>
  );
}
