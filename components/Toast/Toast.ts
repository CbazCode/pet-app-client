import { AlertStatus, createStandaloneToast } from "@chakra-ui/react";
const toast = createStandaloneToast();

export default function showToast(
  title: string,
  message: string,
  type: AlertStatus
) {
  toast({
    title: `${title ?? ""}`,
    description: `${message ?? ""}`,
    position: "top",
    status: `${type ?? "success"}`,
    duration: 9000,
    isClosable: true
  });
}
