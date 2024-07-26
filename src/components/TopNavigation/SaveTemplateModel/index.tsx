import React from 'react';

// Utils
import { MESSAGES } from '../../../utils/message';

// Components
import Dialog from '../../GenericUIBlocks/Dialog';

// Icons
import Save from '../../../assets/images/modal-icons/save';

// Styles
import './styles.scss';

/**
 * Renders a modal dialog for deleting a template.
 *
 * @param {function} handleSave - Callback function to handle the save action.
 * @param {function} handleClose - Callback function to handle the close action.
 * @param {boolean} open - Boolean value indicating whether the modal is open or not.
 * @returns {JSX.Element} The delete template modal component.
 */

const saveDialogStyles = {
  maxWidth: '433px',
  minHeight: '280px',
};

interface SaveTemplateModelProps {
  open: boolean;
  loading: boolean;
  handleClose: () => void;
  handleSave: () => void;
}

const SaveTemplateModel: React.FC<SaveTemplateModelProps> = ({
  handleSave,
  handleClose,
  open,
  loading,
}) => {
  return (
    <Dialog
      icon={<Save fill="var(--primary-color)" />}
      open={open}
      loading={loading}
      handleClose={handleClose}
      title={MESSAGES.TEMPLATE.SAVE.TITLE}
      subHeading={MESSAGES.TEMPLATE.SAVE.HEADING}
      description={MESSAGES.TEMPLATE.SAVE.PARAGRAPH}
      cancelText={MESSAGES.TEMPLATE.SAVE.CANCEL_BUTTON}
      submitText={MESSAGES.TEMPLATE.SAVE.SUBMIT_BUTTON}
      customStyles={saveDialogStyles}
      onSubmit={handleSave}
      onCancel={handleClose}
    />
  );
};

export default SaveTemplateModel;
