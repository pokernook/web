import { Box, Container, Divider, Flex, Heading } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

import { NavLink, NavLinkProps } from "./NavLink";

type FriendsLayoutProps = {
  children: ReactNode;
};

const friendsRoutes: NavLinkProps[] = [
  { children: "All friends", href: "/friends" },
  { children: "Pending requests", href: "/friends/pending" },
];

export const FriendsLayout: FC<FriendsLayoutProps> = ({
  children,
}: FriendsLayoutProps) => (
  <Container maxW="md" pt={20} centerContent>
    <Heading mb={2}>Friends</Heading>

    <Flex>
      {friendsRoutes.map((props, idx) => (
        <Box key={idx} mr={2}>
          <NavLink {...props} />
        </Box>
      ))}
    </Flex>

    <Divider my={3} />

    {children}
  </Container>
);
