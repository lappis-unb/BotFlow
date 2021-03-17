import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import SnackbarContent from './CustomSnackbar';

const MessageSnackbar = ({ notification_text, handleClose, variant = 'success' }) => (
  <Snackbar
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    autoHideDuration={null}
    open={notification_text !== ''}
  >
    <SnackbarContent
      variant={variant}
      message={notification_text}
      onClose={() => handleClose()}
    />
  </Snackbar>
);
export default MessageSnackbar;
