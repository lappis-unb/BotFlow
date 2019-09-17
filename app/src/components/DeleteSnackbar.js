
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';

class DeleteSnackbar extends Component {
    handleUndoSnack() {
        this.props.handleUndo();
        this.props.handleSnackbarClick();
    }

    render() {
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.undo}
                autoHideDuration={2000}
                onClose={() => this.props.handleSnackbarClick(false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span class="success" id="message-id">Item apagado</span>}
                action={[
                    <Button
                        key="undo"
                        color="secondary"
                        size="small"
                        onClick={() => this.handleUndoSnack()}>
                        Desfazer
                    </Button>
                ]}
            />
        )
    }
}
export default DeleteSnackbar;