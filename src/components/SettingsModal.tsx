import {
  Box,
  Divider,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { FC } from "react";
import {
  MemoryRouter,
  NavLink,
  NavLinkProps,
  Redirect,
  Route,
} from "react-router-dom";

import { AccountSettings } from "./AccountSettings";
import { ThemeSettings } from "./ThemeSettings";

type Props = Omit<ModalProps, "children">;

export const SettingsModal: FC<Props> = ({ ...props }: Props) => {
  return (
    <Modal size="2xl" scrollBehavior="inside" {...props}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <ModalBody h={450} roundedBottom="md">
          <MemoryRouter>
            <Grid gap={3} templateColumns={[2, "2fr 5fr"]} ml={3}>
              <Box>
                <SettingsNav />
              </Box>

              <Box pr={4}>
                <SettingsRoutes />
              </Box>
            </Grid>
          </MemoryRouter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const settingsNavRoutes: NavLinkProps[] = [
  { to: "/settings/account", exact: true, children: "Account" },
  { to: "/settings/theme", exact: true, children: "Theme" },
];

const SettingsNav = () => (
  <>
    {settingsNavRoutes.map((props, idx) => (
      <Box key={idx} my={1}>
        <NavLink {...props} />
      </Box>
    ))}
  </>
);

const SettingsRoutes = () => (
  <>
    <Route exact path="/settings/account">
      <AccountSettings />
    </Route>

    <Route exact path="/settings/theme">
      <ThemeSettings />
    </Route>

    <Route>
      <Redirect to="/settings/account" />
    </Route>
  </>
);
