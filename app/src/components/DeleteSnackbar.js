
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from "react";
import IconButton from '@material-ui/core/IconButton';
import {message} from '../utils/messages';

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
                    horizontal: 'left',
                }}
                open={this.props.undo}
                autoHideDuration={3000}
                onClose={() => this.props.handleSnackbarClick(false)}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{message.deleted}</span>}
                action={[
                    <Button
                        key="undo"
                        color="secondary"
                        size="small"
                        onClick={() => this.handleUndoSnack()}>
                        Desfazer
                    </Button>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => this.props.handleSnackbarClick(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        )
    }
}
export default DeleteSnackbar;