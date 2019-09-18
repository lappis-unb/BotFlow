
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "./CustomSnackbar"
import React from "react";

const MessageSnackbar = ({ notification_text, handleClose, variant = "success" }) => {
    return (
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
    )
}
export default MessageSnackbar;