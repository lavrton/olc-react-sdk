import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
// import BackIcon from "../../../assets/images/templates/back-dialog-icon.svg";
// images
import CloseIcon from "../../../assets/images/modal/modal-cross";
import cancelIcon from "../../../assets/images/templates/cancelIcon.png";

// Styles
import "./styles.scss";
import { MESSAGES } from "../../../utils/message";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

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
  // Close the modal
  const handleCloseDialog = () => handleClose(false);

  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="confirmCancelTemplateLeaveModal"
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 5,
          top: 5,
          padding: 0,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent className="confirmTemplateLeaveModalContent">
        <Box className="trashIconWrapper">
          <img src={cancelIcon} alt="trash" />
          <Typography>{MESSAGES.TEMPLATE.CANCEL.TITLE}</Typography>
        </Box>
        <Box className="confirmTemplateLeaveText">
          <Typography>{MESSAGES.TEMPLATE.CANCEL.HEADING}</Typography>
          <Typography>{MESSAGES.TEMPLATE.CANCEL.PARAGRAPH}</Typography>
        </Box>
      </DialogContent>
      <DialogActions className="actionBtns">
        <Button autoFocus onClick={handleCloseDialog}>
          Go Back
        </Button>
        <Button autoFocus onClick={handleNavigateAction}>
          Cancel Template
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

// Prop types
ConfirmNavigateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

ConfirmNavigateDialog.defaultProps = {
  open: false,
};

export default ConfirmNavigateDialog;
