import { SettingsIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useState } from "react";

import { useLogOutMutation, useStatusClearMutation } from "../graphql/types";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";
import { StatusModal } from "./StatusModal";

export const UserNavMenu: FC = () => {
  const { user } = useUser();
  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();
  const [, clearStatus] = useStatusClearMutation();
  const [, logOut] = useLogOutMutation();
  const [, setSettingsModalOpen] = useState(false);
  const [, setProfileModalOpen] = useState(false);
  const avatarSrc = useAvatarSrc(user);

  return (
    <>
      {user?.status && (
        <Tooltip
          label={`${user.status.emoji || ""} ${user.status.message || ""}`}
        >
          <Button onClick={onStatusOpen} p={1} mr={2} variant="ghost">
            {user.status.emoji}
          </Button>
        </Tooltip>
      )}

      <Menu isLazy>
        <MenuButton>
          {avatarSrc && (
            <Avatar showBorder src={avatarSrc} size="sm" bg="black" />
          )}
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Avatar src={avatarSrc} size="md" mr={2} bg="black" />
            <Text fontWeight={600}>{user?.username}</Text>
            <Text fontWeight={600} color="gray.500">
              {user?.discriminator}
            </Text>
          </MenuItem>

          <MenuItem onClick={onStatusOpen}>
            <Input
              isReadOnly
              _hover={{ cursor: "pointer" }}
              defaultValue={
                user?.status
                  ? `${user.status.emoji || ""} ${user.status.message || ""}`
                  : "Update status"
              }
            />
          </MenuItem>

          {user?.status && (
            <MenuItem onClick={() => clearStatus()}>Clear status</MenuItem>
          )}

          <MenuDivider />

          <MenuItem onClick={() => setProfileModalOpen(true)}>
            Edit profile
          </MenuItem>
          <MenuItem>View profile</MenuItem>
          <MenuItem
            icon={<SettingsIcon />}
            onClick={() => setSettingsModalOpen(true)}
          >
            Settings
          </MenuItem>

          <MenuDivider />

          <MenuItem onClick={() => logOut()}>Log out of PokerNook</MenuItem>
        </MenuList>
      </Menu>

      {isStatusOpen && (
        <StatusModal onClose={onStatusClose} isOpen={isStatusOpen} />
      )}
    </>
  );
};
