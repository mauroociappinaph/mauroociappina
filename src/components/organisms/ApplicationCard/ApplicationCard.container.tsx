import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApplicationStore } from '../../../store';
import { ApplicationCardProps } from '../../../interfaces';
import ApplicationCardUI from './ApplicationCard.ui';
import { DateHelpers, StringHelpers, StatusHelpers } from '../../../lib/helpers';

const ApplicationCardContainer: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();
  const { deleteApplication } = useApplicationStore();
  const { id, date } = application;
  const formattedDate = DateHelpers.formatDate(date);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    deleteApplication(id);
    closeDeleteModal();
  };

  return (
    <ApplicationCardUI
      application={application}
      formattedDate={formattedDate}
      getInitials={StringHelpers.getInitials}
      getStatusLabel={StatusHelpers.getStatusLabel}
      handleEdit={handleEdit}
      openDeleteModal={openDeleteModal}
      closeDeleteModal={closeDeleteModal}
      confirmDelete={confirmDelete}
      isDeleteModalOpen={isDeleteModalOpen}
    />
  );
};

export default ApplicationCardContainer;
