import { useState } from "react";
import type { User } from "../api/apiService";
import { userAtom } from "../store/userAtom";
import { useAtom } from "jotai";

export const useUsernameDialog = () => {
  const [, setUser] = useAtom(userAtom);

  const [isOpen, setIsOpen] = useState(false);
  const [onSuccessCallback, setOnSuccessCallback] = useState<((user: User) => void) | null>(null);

  const openDialog = (onSuccess?: (user: User) => void) => {
    setOnSuccessCallback(() => onSuccess || null);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setOnSuccessCallback(null);
  };

  const handleSuccess = (user: User) => {
    if (onSuccessCallback) {
      onSuccessCallback(user);
      setUser(user);
    }
    closeDialog();
  };

  return {
    isOpen,
    openDialog,
    closeDialog,
    handleSuccess,
  };
};
