import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { handleOnChange, handleOnClear } from '@chore/utils/formUtils';
import { postData } from '@chore/services/HandleAPI';
import { $user } from '@/stores/users';
import { Server1API } from '@chore/config/constants';
import { setLocalStorage } from '@/modules/chore/utils/handleLocalStorage';

/* import { toast } from "react-hot-toast"; */
export const useLoginForm = (formInit: { email: string; password: string }) => {
  const user = useStore($user);
  const [form, setForm] = useState(formInit);
  const [isVisible, setIsVisible] = useState(false);
  const [isInvalidPass, setIsInvalidPass] = useState(false);

  const { data, error, status, mutate, isPending } = postData({
    key: 'login',
    url: `${Server1API}/auth/login`,
    method: 'POST',
  });

  useEffect(() => {
    if (status === 'success') {
      $user.set(data);
      setLocalStorage('user', data);
      /*  toast.success(`Bienvenido ${data.user.username}`); */
    } else if (status === 'error') {
      /* toast.error(error?.message || ""); */
      error?.message === 'Contraseña Incorrecta' && setIsInvalidPass(true);
    }
    /* return () => toast.dismiss(); */
  }, [data, error, status]);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(form);
  };
  return {
    ...form,
    toggleVisibility,
    handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleOnChange(setForm, e),
    handleOnClear: (name: string) => handleOnClear(name, setForm),
    handleLogin,
    isVisible,
    isInvalidPass,
    user,
    isPending,
  };
};
