import React from 'react';

// components
import Dialog from '../../GenericUIBlocks/Dialog';
import Input from '../../GenericUIBlocks/Input';
import Typography from '../../../components/GenericUIBlocks/Typography';
import TextArea from '../../../components/GenericUIBlocks/TextArea';

// styles
import './styles.scss'

const hireModalStyles = {
  maxWidth: '725px',
  minHeight: '800px',
};

const HireDesigner = (props: any) => {
  const {open, onClose} = props;
  return (
    <Dialog open={open} customStyles={hireModalStyles} onClose={onClose} isGallery={true} designerForm={true} submitText='Next'>
      <div className="designerFormWrapper">
        <Typography>Custom Design Form</Typography>
       <form className='designerForm'>
       <Input 
        type="text"
        placeholder='Template Name'
        label='Template Name*'
        // error='errorMessage'
        />
        <Input 
        type="file"
        label='Upload Design Files*'
        isFileUploader={true}
        // error='errorMessage'
        />
        <Input 
        type="text"
        placeholder='https://www.example.com'
        label='Video URL'
        videoTooltip={true}
        />
        <Input 
        type="email"
        placeholder='Email'
        label='Email*'
        // error='errorMessage'
        />
        <TextArea label='Comments*' placeholder="Add your comments here"/>
       </form>
      </div>
    </Dialog>
  );
};

export default HireDesigner;
