
import React, { Component } from "react";
import {message} from '../utils/messages';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';

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
                message={<span class="success" id="message-id">{message.deleted}</span>}
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