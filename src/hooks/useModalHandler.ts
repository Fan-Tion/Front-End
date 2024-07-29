import { useState } from 'react';

export const useModalHandler = (initialState: boolean = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const toggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  return {
    isModalOpen,
    toggleModal,
  };
};
