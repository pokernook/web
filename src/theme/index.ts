import { extendTheme, ThemeOverride } from "@chakra-ui/react";

import { Link, Menu } from "./components";
import { styles } from "./styles";

const overrides: ThemeOverride = {
  styles,
  config: {
    useSystemColorMode: true,
  },
  components: {
    Link,
    Menu,
  },
};

export const theme = extendTheme(overrides);
