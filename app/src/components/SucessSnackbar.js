
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from "./CustomSnackbar"
import React from "react";

const SucessSnackbar = ({notification_text ,handleClose}) => {
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            autoHideDuration={6000}
            open={notification_text !== ''}
            onClose={() => handleClose()}>
            <SnackbarContent
                variant="success"
                message={notification_text}
                onClose={() => handleClose()}
            />
        </Snackbar>
    )
}
export default SucessSnackbar;