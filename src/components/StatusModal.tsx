import "emoji-mart/css/emoji-mart.css";

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { BaseEmoji, Picker } from "emoji-mart";
import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";

import {
  StatusSetMutationVariables,
  useStatusClearMutation,
  useStatusSetMutation,
} from "../graphql/types";
import { useUser } from "../hooks/use-user";

type Props = Pick<ModalProps, "onClose" | "isOpen">;

type FormData = StatusSetMutationVariables;

export const StatusModal: FC<Props> = ({ onClose, ...props }: Props) => {
  const { user } = useUser();
  const { colorMode } = useColorMode();
  const defaultEmoji = user?.status?.emoji || "💬";
  const [, clearStatus] = useStatusClearMutation();
  const [, setStatus] = useStatusSetMutation();
  const {
    isOpen: isPickerOpen,
    onOpen: onPickerOpen,
    onClose: onPickerClose,
  } = useDisclosure();
  const { control, handleSubmit, register, getValues } = useForm<FormData>({
    defaultValues: {
      emoji: defaultEmoji,
      message: user?.status?.message,
    },
  });

  const handleClearStatus = async () => {
    onClose();
    await clearStatus();
  };

  const handleSaveStatus = handleSubmit(async (data) => {
    const result = await setStatus(data);
    if (!result.error) {
      onClose();
    }
  });

  return (
    <>
      <Modal autoFocus={false} onClose={onClose} {...props}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set a status</ModalHeader>
          <ModalCloseButton />

          <ModalBody
            as="form"
            id="status-form"
            onSubmit={handleSaveStatus}
            overflowWrap="normal"
          >
            <FormControl mb={3}>
              <FormLabel>What&apos;s happening {user?.username}?</FormLabel>
              <InputGroup>
                <InputLeftElement
                  w="3rem"
                  _hover={{ cursor: "pointer" }}
                  onClick={onPickerOpen}
                >
                  {getValues("emoji")}
                </InputLeftElement>
                <Input
                  spellCheck
                  {...register("message", { required: true })}
                  pl="3rem"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup>
              <Button onClick={handleClearStatus}>Clear status</Button>
              <Button colorScheme="blue" type="submit" form="status-form">
                Save status
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isPickerOpen} onClose={onPickerClose}>
        <ModalContent w={0} h={0}>
          <Controller
            name="emoji"
            control={control}
            render={({ field }) => (
              <Picker
                title="Pick an emoji"
                emoji="point_up"
                native
                theme={colorMode}
                onSelect={(emoji: BaseEmoji) => {
                  field.onChange(emoji.native);
                  onPickerClose();
                }}
              />
            )}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
