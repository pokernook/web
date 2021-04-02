import { extendTheme, ThemeOverride } from "@chakra-ui/react";

import { Button, Link } from "./components";
import { styles } from "./styles";

const overrides: ThemeOverride = {
  styles,
  config: {
    useSystemColorMode: true,
  },
  components: {
    Button,
    Link,
  },
};

export const theme = extendTheme(overrides);
