
import React, { Component } from "react";
import { message } from '../utils/messages';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteSnackbar extends Component {
    render() {
        return (
            <Dialog
                open={this.props.dialog_status}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message.delete_confirmation}</DialogTitle>
                <DialogActions>
                    <Button color="primary" onClick={() => this.props.handleClose(false)}>
                        Não
                    </Button>
                    <Button color="primary" autoFocus onClick={() => this.props.deleteItem()}>
                        Tenho certeza
                    </Button>
                </DialogActions>
            </Dialog>

        )
    }
}
export default DeleteSnackbar;