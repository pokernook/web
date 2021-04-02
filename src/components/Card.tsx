import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type CardProps = BoxProps;

export const Card: FC<CardProps> = (props) => (
  <Box p={2} rounded="md" borderWidth={1} {...props} />
);
