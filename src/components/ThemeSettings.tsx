import { Box, Heading, Select, Text, useColorMode } from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";

export const ThemeSettings: FC = () => {
  const { colorMode, setColorMode } = useColorMode();

  const handleModeChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setColorMode(e.target.value);

  return (
    <>
      <Heading size="md" mb={3}>
        Theme
      </Heading>

      <Box mb={3}>
        <Text>Choose how PokerNook looks to you.</Text>
      </Box>

      <Select defaultValue={colorMode} onChange={handleModeChange}>
        <option value="dark">Dark</option>
        <option value="light">Light</option>
      </Select>
    </>
  );
};
