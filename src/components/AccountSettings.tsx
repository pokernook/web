import {
  Box,
  Button,
  Divider,
  Fade,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { FC } from "react";
import { useForm } from "react-hook-form";

import {
  MutationUserUpdateEmailArgs,
  MutationUserUpdatePasswordArgs,
  useDeleteAccountMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../graphql";
import { useUser } from "../hooks/use-user";

export const AccountSettings: FC = () => (
  <>
    <UpdateEmail />
    <Divider my={3} />
    <UpdatePassword />
    <Divider my={3} />
    <DeleteAccount />
  </>
);

const UpdateEmail = () => {
  const { user } = useUser();
  const {
    handleSubmit,
    register,
    formState,
    reset,
  } = useForm<MutationUserUpdateEmailArgs>({
    defaultValues: { newEmail: user?.email },
  });
  const [, updateEmail] = useUpdateEmailMutation();

  const { isDirty } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateEmail(data);
    if (!result.error) {
      reset({ newEmail: result.data?.userUpdateEmail?.email });
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Email
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Email address</FormLabel>
        <Input type="email" {...register("newEmail", { required: true })} />
        <FormHelperText>
          {!user?.emailVerified && (
            <>
              Not verified; check your inbox, or{" "}
              <Link>resend the verification email</Link>.
            </>
          )}
        </FormHelperText>
      </FormControl>

      <Fade in={isDirty} unmountOnExit>
        <FormControl mb={3}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", { required: true })}
          />
        </FormControl>

        <Button type="submit">Save email</Button>
      </Fade>
    </Box>
  );
};

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<MutationUserUpdatePasswordArgs>();
  const [, updatePassword] = useUpdatePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const result = await updatePassword(data);
    if (!result.error) {
      reset();
    }
  });

  return (
    <Box as="form" onSubmit={onSubmit}>
      <Heading size="md" mb={3}>
        Update password
      </Heading>

      <FormControl mb={2}>
        <FormLabel>Current password</FormLabel>
        <Input
          type="password"
          {...register("currentPassword", { required: true })}
        />
      </FormControl>

      <FormControl mb={3}>
        <FormLabel>New password</FormLabel>
        <Input
          type="password"
          {...register("newPassword", { required: true })}
        />
      </FormControl>

      <Button type="submit">Update password</Button>
    </Box>
  );
};

const DeleteAccount = () => {
  const [, deleteAccount] = useDeleteAccountMutation();

  const handleDeleteAccount = () => deleteAccount();

  return (
    <>
      <Heading size="md" mb={3}>
        Delete account
      </Heading>
      <FormLabel mb={2}>Careful, there&apos;s no coming back.</FormLabel>

      <Button colorScheme="red" onClick={handleDeleteAccount}>
        Delete account
      </Button>
    </>
  );
};
