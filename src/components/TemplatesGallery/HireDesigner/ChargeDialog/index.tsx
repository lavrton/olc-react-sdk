import React from 'react';

// components
import Dialog from '../../../GenericUIBlocks/Dialog/index';

// icons
import Charge from '../../../../assets/images/modal-icons/charge';
import Typography from '../../../../components/GenericUIBlocks/Typography';

// styles
import './styles.scss';

const chargeModalStyles = {
  maxWidth: '426px',
  minHeight: '275px',
};

const ChargeDialog = (props: any) => {
  const {open, onClose} = props;
  return (
    <Dialog
      icon={<Charge />}
      open={open}
      customStyles={chargeModalStyles}
      designerForm={true}
      isGallery={true}
      submitText="Purchase Now"
    >
      <Typography>You’ll be charged <span>$75</span> for this design.</Typography>
    </Dialog>
  );
};

export default ChargeDialog;
