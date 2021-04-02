import { extendTheme, ThemeOverride } from "@chakra-ui/react";

import { Button, Link } from "./components";

const overrides: ThemeOverride = {
  config: {
    useSystemColorMode: true,
  },
  components: {
    Button,
    Link,
  },
};

export const theme = extendTheme(overrides);
