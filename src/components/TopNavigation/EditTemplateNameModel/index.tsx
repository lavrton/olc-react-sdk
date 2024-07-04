import React, { useEffect, useState } from 'react';

// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';

// Actions
import { searchAndAdvanceChange } from '../../../redux/actions/templateActions';
import { failure } from '../../../redux/actions/snackbarActions';

// Utils
import { MESSAGES } from '../../../utils/message';

// UI Components
import Dialog from '../../../components/GenericUIBlocks/Dialog';
import Input from '../../../components/GenericUIBlocks/Input';

// Styles
import './styles.scss';


/**
 * EditTemplateNameModel Component
 * A modal for duplicating a template.
 *
 * @param {boolean} open - Boolean indicating whether the modal is open.
 * @param {Function} handleClose - Function to handle the closing of the modal.
 * @returns {JSX.Element} The duplicate template modal component.
 *
 */

interface EditTemplateNameModelProps {
  open: boolean;
  handleClose: () => void;
}

const editDialogStyles = {
  maxWidth: '630px',
  minHeight: '210px',
};

const EditTemplateNameModel: React.FC<EditTemplateNameModelProps> = ({
  open,
  handleClose,
}) => {
  const [title, setTitle] = useState('');

  const dispatch: AppDispatch = useDispatch();

  const templateTitle =
    useSelector((state: RootState) => state.templates.title) || '';

  useEffect(() => {
    setTitle(templateTitle);
  }, []);

  // Handle the duplication of the template
  const handleEditName = async () => {
    let errorText = '';
    if (!title) {
      errorText = MESSAGES.TEMPLATE.NAME_REQUIRED;
    } else if (title.length > 50) {
      errorText = MESSAGES.TEMPLATE.NAME_LESS_50;
    }
    if (errorText) {
      dispatch(failure(errorText));
      return;
    }
    dispatch(searchAndAdvanceChange('title', title.trim()));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      loading={false}
      handleClose={handleClose}
      title="Edit Template Name"
      cancelText={MESSAGES.TEMPLATE.SAVE.CANCEL_BUTTON}
      submitText="Save"
      customStyles={editDialogStyles}
      onSubmit={handleEditName}
      onCancel={handleClose}
    >
      <Input
        variant="input"
        type="text"
        label="Template Name"
        placeholder="Holidays"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
    </Dialog>
  );
};

export default EditTemplateNameModel;

