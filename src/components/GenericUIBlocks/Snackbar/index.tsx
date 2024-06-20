import React, { useEffect } from 'react';

//Hooks
import { useSnackbar } from 'react-simple-snackbar';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from '../../../redux/store';

// Actions
import { closeSnackbar } from '../../../redux/actions/snackbarActions';

// components
import Typography from '../Typography';

// styles
import './styles.scss'


const options = {
  position: 'top-right',
  style: {
    backgroundColor: '#EF7820',
    width: '400px',
    color: 'white',
    fontFamily: 'Inter',
    fontSize: '16px',
    textAlign: 'center',
  },
  closeStyle: {
    color: 'white',
    fontSize: '16px',
  },
};

const Snackbar:React.FC = () => {
  const [openSnackbar] = useSnackbar(options);

  const open = useSelector((state: RootState) => state.snackbarReducers.snackbar.open);

  const heading = useSelector(
    (state: RootState) => state.snackbarReducers.snackbar.heading
  );
  const message = useSelector(
    (state: RootState) => state.snackbarReducers.snackbar.message
  );

  const dispatch: AppDispatch = useDispatch();

  const Element =
    <div className="snackbar">
      <Typography>{heading || ''}</Typography>
      <Typography>{message || ''}</Typography>
    </div>

  useEffect(() => {
    if (open) {
      openSnackbar(Element, [5000])
      dispatch(closeSnackbar())
    }
  }, [open]);

  return (
    Element
  )
};

export default Snackbar;
