import { Box, BoxProps } from "@chakra-ui/react";
import { FC } from "react";

type CardProps = BoxProps;

export const Card: FC<CardProps> = (props) => (
  <Box p={4} rounded="sm" borderWidth={1} {...props} />
);
