import React from "react";

import Dialog from '../../GenericUIBlocks/Dialog';


// images
import CloseIcon from "../../../assets/images/modal-icons/modal-cross";
import cancelIcon from "../../../assets/modal-icons/cancelIcon.png";
// import BackIcon from "../../../assets/images/templates/back-dialog-icon.svg";

// Styles
import "./styles.scss";

// import { MESSAGES } from "../../../utils/message";


const dialogStyles = {
  maxWidth: "450px",
  minHeight: "300px",
}


/**
 * ConfirmNavigateDialog Component
 * A modal for duplicating a template.
 *
 * @param {boolean} open - Boolean indicating whether the modal is open.
 * @param {Function} handleClose - Function to handle the closing of the modal.
 * @returns {JSX.Element} The duplicate template modal component.
 *
 */
const ConfirmNavigateDialog = ({ open, handleClose, handleNavigateAction }) => {

  return (
    <>
      <Dialog
        customStyles={dialogStyles}
        open={open}
        handleClose={handleClose}
        title="Confirm Cancel Template"
        subHeading="Are you sure you want to cancel this Template?"
        desscription="You will lose your changes after canceling."
        onSubmit={() => handleNavigateAction()}
        onCancel={handleClose}
        cancelText="Go Back"
        submitText="Cancel Template"
      />
    </>
  );
};

export default ConfirmNavigateDialog;
