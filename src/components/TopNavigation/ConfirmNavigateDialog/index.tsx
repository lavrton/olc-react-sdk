import React from "react";

// Utils
import { MESSAGES } from "../../../utils/message";

// Components
import Dialog from '../../GenericUIBlocks/Dialog';

// images
import ModalCross from '../../../assets/images/modal-icons/modal-cross';

// Styles
import "./styles.scss";


/**
 * ConfirmNavigateDialog Component
 * A modal for duplicating a template.
 *
 * @param {boolean} open - Boolean indicating whether the modal is open.
 * @param {Function} handleClose - Function to handle the closing of the modal.
 * @returns {JSX.Element} The duplicate template modal component.
 *
 */

const cancelDialogStyles = {
  maxWidth: '407px',
  minHeight: '258px',
};

// Define the props type
interface ConfirmNavigateDialogProps {
  open: boolean;
  handleClose: () => void;
  handleNavigateAction: () => void;
}


const ConfirmNavigateDialog: React.FC<ConfirmNavigateDialogProps> = ({ open, handleClose, handleNavigateAction }) => {

  return (
    <Dialog
      icon={<ModalCross />}
      customStyles={cancelDialogStyles}
      open={open}
      handleClose={handleClose}
      title={MESSAGES.TEMPLATE.CANCEL.TITLE}
      subHeading={MESSAGES.TEMPLATE.CANCEL.HEADING}
      description={MESSAGES.TEMPLATE.CANCEL.PARAGRAPH}
      onSubmit={handleNavigateAction}
      onCancel={handleClose}
      cancelText={MESSAGES.TEMPLATE.CANCEL.BACK_BUTTON}
      submitText={MESSAGES.TEMPLATE.CANCEL.CANCEL_BUTTON}
    />
  );
};

export default ConfirmNavigateDialog;
