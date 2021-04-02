import { Avatar, Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FC } from "react";
import { FiCheck, FiMoreVertical, FiX } from "react-icons/fi";

import { Card } from "../components/Card";
import {
  FriendRequestFieldsFragment,
  UserFieldsFragment,
} from "../graphql/types";
import { useAvatarSrc } from "../hooks/use-avatar-src";

type FriendProps = {
  friend: UserFieldsFragment;
};

export const Friend: FC<FriendProps> = ({ friend }: FriendProps) => (
  <>
    <Card>
      <Avatar src={useAvatarSrc(friend)} size="md" mr={3} />
      <Box>
        <Flex mb={2}>
          <Heading>{friend.username}</Heading>
          <Heading color="GrayText">{friend.discriminator}</Heading>
        </Flex>

        {friend.status &&
          `${friend.status.emoji || ""} ${friend.status.message || ""}`}
      </Box>

      <Flex alignItems="center" justifyContent="flex-end" flex={1}>
        <IconButton aria-label="More options" icon={<FiMoreVertical />} />
      </Flex>
    </Card>
  </>
);

type SentProps = {
  friendRequest: FriendRequestFieldsFragment;
  onCancel: () => void;
};

export const FriendRequestSent: FC<SentProps> = ({
  friendRequest,
  onCancel,
}: SentProps) => {
  const sentAt = formatDistanceToNow(new Date(friendRequest.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card>
        <Avatar src={useAvatarSrc(friendRequest.to)} size="md" mr={3} />

        <Box>
          <Flex mb={2}>
            <Heading>{friendRequest.to?.username}</Heading>
            <Heading color="GrayText">
              {friendRequest.to?.discriminator}
            </Heading>
          </Flex>

          {friendRequest.to?.status &&
            `${friendRequest.to.status.emoji || ""} ${
              friendRequest.to.status.message || ""
            }`}
        </Box>

        <Flex alignItems="center" justifyContent="flex-end" flex={1}>
          <Text mr={3}>Sent {sentAt}</Text>
          <IconButton
            aria-label="Cancel friend request"
            icon={<FiX />}
            onClick={onCancel}
          />
        </Flex>
      </Card>
    </>
  );
};

type ReceivedProps = {
  friendRequest: FriendRequestFieldsFragment;
  onAccept: () => void;
  onReject: () => void;
};

export const FriendRequestReceived: FC<ReceivedProps> = ({
  friendRequest,
  onAccept,
  onReject,
}: ReceivedProps) => {
  const receivedAt = formatDistanceToNow(new Date(friendRequest.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card>
        <Avatar src={useAvatarSrc(friendRequest.from)} size="md" mr={3} />

        <Box>
          <Flex mb={2}>
            <Heading>{friendRequest.from?.username}</Heading>
            <Heading color="GrayText">
              {friendRequest.from?.discriminator}
            </Heading>
          </Flex>

          {friendRequest.from?.status &&
            `${friendRequest.from.status.emoji || ""} ${
              friendRequest.from.status.message || ""
            }`}
        </Box>

        <Flex alignItems="center" justifyContent="flex-end" flex={1}>
          <Text mr={3}>Received {receivedAt}</Text>
          <IconButton
            aria-label="Accept friend request"
            icon={<FiCheck />}
            mr={2}
            onClick={onAccept}
          />
          <IconButton
            aria-label="Ignore friend request"
            icon={<FiX />}
            onClick={onReject}
          />
        </Flex>
      </Card>
    </>
  );
};
