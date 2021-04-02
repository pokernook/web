import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { DashboardLayout } from "../../components/DashboardLayout";
import {
  FriendRequestReceived,
  FriendRequestSent,
} from "../../components/Friends";
import { FriendsLayout } from "../../components/FriendsLayout";
import {
  useFriendRequestAcceptMutation,
  useFriendRequestCancelMutation,
  useFriendRequestRejectMutation,
  useFriendRequestSendMutation,
  useFriendRequestsReceivedQuery,
  useFriendRequestsSentQuery,
} from "../../graphql/types";
import { parseUserTag } from "../../utils/parse-user-tag";

type FormData = {
  tag: string;
};

const PendingFriends: FC = () => {
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [, sendFriendRequest] = useFriendRequestSendMutation();

  const onSubmit = handleSubmit(async ({ tag }) => {
    const userTag = parseUserTag(tag);
    const result = await sendFriendRequest(userTag);
    if (!result.error) {
      reset();
    }
  });

  return (
    <DashboardLayout>
      <FriendsLayout>
        <Box as="form" onSubmit={onSubmit} mb={3}>
          <FormLabel>Add a friend with their PokerNook Tag</FormLabel>
          <InputGroup>
            <Input
              {...register("tag", {
                required: true,
                pattern: /^.+#\d{1,4}$/,
              })}
              pr="4.5rem"
              placeholder="Enter a Username#0000"
            />
            <InputRightElement width="4.5rem">
              <Button type="submit">Add friend</Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        <ReceivedList />
        <SentList />
      </FriendsLayout>
    </DashboardLayout>
  );
};

const ReceivedList = () => {
  const [friendRequestsReceivedQuery] = useFriendRequestsReceivedQuery();
  const [, rejectFriendRequest] = useFriendRequestRejectMutation();
  const [, acceptFriendRequest] = useFriendRequestAcceptMutation();

  const { data: friendRequestsReceived } = friendRequestsReceivedQuery;

  return (
    <>
      {friendRequestsReceived?.me?.friendRequestsReceived.map(
        (friendRequest) => (
          <Box key={friendRequest.id} my={2}>
            <FriendRequestReceived
              onAccept={() =>
                acceptFriendRequest({ friendRequestId: friendRequest.id })
              }
              onReject={() =>
                rejectFriendRequest({ friendRequestId: friendRequest.id })
              }
              friendRequest={friendRequest}
            />
          </Box>
        )
      )}
    </>
  );
};

const SentList = () => {
  const [friendRequestsSentQuery] = useFriendRequestsSentQuery();
  const [, cancelFriendRequest] = useFriendRequestCancelMutation();

  const { data: friendRequestsSent } = friendRequestsSentQuery;

  return (
    <>
      {friendRequestsSent?.me?.friendRequestsSent.map((friendRequest) => (
        <Box key={friendRequest.id} my={2}>
          <FriendRequestSent
            onCancel={() =>
              cancelFriendRequest({ friendRequestId: friendRequest.id })
            }
            friendRequest={friendRequest}
          />
        </Box>
      ))}
    </>
  );
};

export default PendingFriends;
