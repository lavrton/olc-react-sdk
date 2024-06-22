import React, {useEffect, useState} from 'react';
// import PropTypes from 'prop-types';
// import Button from '@mui/material/Button';
// import {styled} from '@mui/material/styles';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
// import IconButton from '@mui/material/IconButton';
// import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
// import {Input} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
// Styles
import './styles.scss';
// images
// import Close from '../../../../assets/images/modal/modal-cross.jsx';

// import {searchAndAdvanceChange} from '../../../../redux/actions/template-builder';
// import {failure} from '../../../redux/actions/snackbar-actions';
import {MESSAGES} from '../../../utils/message';
import Dialog from '../../../components/GenericUIBlocks/Dialog';
import Save from '../../../assets/images/modal-icons/save';
import Input from '../../../components/GenericUIBlocks/Input';


// const BootstrapDialog = styled(Dialog)(({theme}) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

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

  // const dispatch = useDispatch();

  const templateTitle =
    useSelector((state) => state.templates.title) || '';

  useEffect(() => {
    setTitle(templateTitle);
  }, []);

  // Handle the duplication of the template
  // const handleEditName = async () => {
  //   let errorText = '';
  //   if (!title) {
  //     errorText = MESSAGES.TEMPLATE.NAME_REQUIRED;
  //   } else if (title.length > 50) {
  //     errorText = MESSAGES.TEMPLATE.NAME_LESS_50;
  //   }
  //   if (errorText) {
  //     dispatch(failure(errorText));
  //     return;
  //   }
  //   dispatch(searchAndAdvanceChange('title', title.trim()));
  //   handleClose(false)
  // };

  return (
    <Dialog
      open={open}
      loading={false}
      handleClose={handleClose}
      title="Edit Template Name"
      cancelText={MESSAGES.TEMPLATE.SAVE.CANCEL_BUTTON}
      submitText="Save"
      customStyles={editDialogStyles}
      onSubmit={()=>{}}
      onCancel={handleClose}
    >
      <Input
        variant="input"
        type="text"
        label="Template Name"
        placeholder="Edit Template Name"
        value={title}
        onChange={(e:any) => setTitle(e.target.value)}
      />
    </Dialog>
  );
};

export default EditTemplateNameModel;

