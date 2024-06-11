import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import {Input} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
// Styles
import './styles.scss';
// images
import Close from '../../../../assets/images/modal/modal-cross.jsx';

import {searchAndAdvanceChange} from '../../../../redux/actions/template-builder';
import {failure} from '../../../../redux/actions/snackbar-actions';
import {MESSAGES} from '../../../../utils/message';

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

/**
 * EditTemplateNameModel Component
 * A modal for duplicating a template.
 *
 * @param {boolean} open - Boolean indicating whether the modal is open.
 * @param {Function} handleClose - Function to handle the closing of the modal.
 * @returns {JSX.Element} The duplicate template modal component.
 *
 */
const EditTemplateNameModel = ({open, handleClose}) => {
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  const templateTitle =
    useSelector((state) => state.templateReducer.title) || '';

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
    handleClose(false)
  };

  return (
    <BootstrapDialog
      onClose={handleCloseDialog}
      aria-labelledby="customized-dialog-title"
      open={open}
      className="editTemplateNameModal"
    >
      <DialogTitle
        className="editTemplateNameModalTitle"
        sx={{m: 0, p: 2}}
        id="customized-dialog-title"
      >
        Edit Template Name
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleCloseDialog}
        sx={{
          position: 'absolute',
          right: 5,
          top: 5,
          padding: '0',
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <Close />
      </IconButton>
      <DialogContent className="editTemplateNameModalContent">
        <Typography>Template Name</Typography>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Holidays"
        />
      </DialogContent>
      <DialogActions className="actionBtns">
        <Button autoFocus onClick={handleCloseDialog}>
          Cancel
        </Button>
        <Button autoFocus onClick={handleEditName}>
          Save
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default EditTemplateNameModel;
