
import React from "react";
import { message } from '../utils/messages';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeletionConfirmationDialog = ({ dialog_status, handleClose, deleteItem }) => {
    return (
        <Dialog
            open={dialog_status}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{message.delete_confirmation}</DialogTitle>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={() => handleClose(false)}
                >
                    Cancelar
                    </Button>
                <Button
                    autoFocus
                    color="primary"
                    onClick={() => deleteItem()}
                >
                    Apagar
                    </Button>
            </DialogActions>
        </Dialog>

    )
}

export default DeletionConfirmationDialog;