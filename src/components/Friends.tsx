import { CheckIcon, ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { Avatar, Box, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { FC, ReactNode } from "react";

import { Card } from "../components/Card";
import { FriendRequestFieldsFragment, UserFieldsFragment } from "../graphql";
import { useAvatarSrc } from "../hooks/use-avatar-src";

type FriendCard = {
  children: ReactNode;
};

const FriendCard: FC<FriendCard> = ({ children }: FriendCard) => (
  <Card display="flex" alignItems="center">
    {children}
  </Card>
);

type FriendProps = {
  friend: UserFieldsFragment;
};

export const Friend: FC<FriendProps> = ({ friend }: FriendProps) => (
  <FriendCard>
    <Avatar src={useAvatarSrc(friend)} size="lg" bg="black" showBorder mr={2} />
    <Box>
      <Flex>
        <Text fontWeight={600}>{friend.username}</Text>
        <Text fontWeight={600} color="gray.500">
          {friend.discriminator}
        </Text>
      </Flex>

      {friend.status && (
        <Text>
          {friend.status.emoji} {friend.status.message}
        </Text>
      )}
    </Box>

    <Flex justifyContent="flex-end" flex={1}>
      <IconButton aria-label="More options" icon={<ChevronDownIcon />} />
    </Flex>
  </FriendCard>
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
    <FriendCard>
      <Avatar
        src={useAvatarSrc(friendRequest.to)}
        size="lg"
        bg="black"
        showBorder
        mr={2}
      />
      <Box>
        <Flex>
          <Text fontWeight={600}>{friendRequest.to.username}</Text>
          <Text fontWeight={600} color="gray.500">
            {friendRequest.to.discriminator}
          </Text>
        </Flex>

        {friendRequest.to.status && (
          <Text>
            {friendRequest.to.status.emoji} {friendRequest.to.status.message}
          </Text>
        )}
      </Box>

      <HStack justifyContent="flex-end" flex={1}>
        <Text>Sent {sentAt}</Text>
        <IconButton
          aria-label="Cancel friend request"
          icon={<CloseIcon />}
          onClick={onCancel}
        />
      </HStack>
    </FriendCard>
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
    <FriendCard>
      <Avatar
        src={useAvatarSrc(friendRequest.from)}
        size="lg"
        bg="black"
        showBorder
        mr={2}
      />
      <Box>
        <Flex>
          <Text fontWeight={600}>{friendRequest.from.username}</Text>
          <Text fontWeight={600} color="gray.500">
            {friendRequest.from.discriminator}
          </Text>
        </Flex>

        {friendRequest.from.status && (
          <Text>
            {friendRequest.from.status.emoji}{" "}
            {friendRequest.from.status.message}
          </Text>
        )}
      </Box>

      <HStack justifyContent="flex-end" flex={1}>
        <Text>Received {receivedAt}</Text>
        <IconButton
          aria-label="Accept friend request"
          icon={<CheckIcon />}
          onClick={onAccept}
        />
        <IconButton
          aria-label="Ignore friend request"
          icon={<CloseIcon />}
          onClick={onReject}
        />
      </HStack>
    </FriendCard>
  );
};
