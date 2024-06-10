import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, CircularProgress } from "@mui/material";
// Styles
import "./styles.scss";
// Images
import SaveIcon from "../../../../assets/images/templates/template-save-icon.svg";
import Close from "../../../../assets/images/modal/modal-cross.jsx";
import { MESSAGES } from "../../../../utils/message";
/**
 * Renders a modal dialog for deleting a template.
 *
 * @param {function} handleSave - Callback function to handle the save action.
 * @param {function} handleClose - Callback function to handle the close action.
 * @param {boolean} open - Boolean value indicating whether the modal is open or not.
 * @returns {JSX.Element} The delete template modal component.
 */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const SaveTemplateModel = ({ handleSave, handleClose, open, loading }) => {
  return (
    <BootstrapDialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="confirmTemplateSaveModal"
    >
      <IconButton
        aria-label="close"
        onClick={handleClose}
        disabled={loading}
        sx={{
          position: "absolute",
          right: 5,
          top: 5,
          padding: "0",
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close disabled={loading} />
      </IconButton>
      <DialogContent className="confirmTemplateSaveModalContent">
        <Box className="trashIconWrapper">
          <img src={SaveIcon} alt="save" />
          <Typography>{MESSAGES.TEMPLATE.SAVE.TITLE}</Typography>
        </Box>
        <Box className="confirmTemplateSaveText">
          <Typography>{MESSAGES.TEMPLATE.SAVE.HEADING}</Typography>
          <Typography>{MESSAGES.TEMPLATE.SAVE.PARAGRAPH}</Typography>
        </Box>
      </DialogContent>
      <DialogActions className="actionBtns">
        <Button disabled={loading} autoFocus onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={loading} autoFocus onClick={handleSave}>
          {loading ? (
            <CircularProgress
              sx={{
                color: "white",
                width: "25px !important",
                height: "25px !important",
              }}
            />
          ) : (
            "Save"
          )}
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

// Prop types
SaveTemplateModel.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
};

// Default props
SaveTemplateModel.defaultProps = {
  open: false,
  loading: false,
};

export default SaveTemplateModel;
