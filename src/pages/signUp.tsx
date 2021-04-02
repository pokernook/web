import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";

import { AuthLayout } from "../components/AuthLayout";
import { Card } from "../components/Card";
import { SignUpMutationVariables, useSignUpMutation } from "../graphql/types";

const SignUp: FC = () => {
  const { register, handleSubmit } = useForm<SignUpMutationVariables>();
  const [signUpResult, signUp] = useSignUpMutation();

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <AuthLayout>
      <Heading size="lg" mb={3}>
        Create your account
      </Heading>

      <Card minW={320} textAlign="center">
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={2}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              spellCheck={false}
              {...register("username", { required: true })}
            />
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>Email</FormLabel>
            <Input type="email" {...register("email", { required: true })} />
          </FormControl>

          <FormControl mb={3}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              {...register("password", { required: true })}
            />
          </FormControl>

          <Button type="submit" disabled={signUpResult.fetching} minWidth="70%">
            {signUpResult.fetching
              ? "We're working on it..."
              : "Sign up for PokerNook"}
          </Button>
        </Box>
      </Card>

      <Card mt={3} minW={320} textAlign="center">
        <Text>
          Been here before?{" "}
          <Link href="/logIn" passHref>
            <ChakraLink>Log in</ChakraLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default SignUp;
