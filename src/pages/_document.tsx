import { ColorModeScript } from "@chakra-ui/react";
import {
  default as NextDocument,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

// TODO: Avoid flash of incorrect color mode
class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
