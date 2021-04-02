import { extendTheme, ThemeOverride } from "@chakra-ui/react";

import { Link } from "./components";
import { styles } from "./styles";

const overrides: ThemeOverride = {
  styles,
  config: {
    useSystemColorMode: true,
  },
  components: {
    Link,
  },
};

export const theme = extendTheme(overrides);
