import React, {Component} from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Button} from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

class UtterDelete extends Component {

    constructor(props) {
        super(props);
        this.state = { anchorEl: this.props.anchorEl, setAnchorEl: null,  
        open: Boolean(this.props.anchorEl), 
        };
    }

    render(){
        const options = ['Apagar'];
        const ITEM_HEIGHT = 20;
        
        return(
            <div>
                <IconButton
                    style = {{marginLeft: 1100, marginTop:-120, width:35, height:35, color: 'black'}}
                    onClick = {e => this.props.handleClickMenu(e)}>
                    <MoreVertIcon />
                </IconButton>
                <Menu   
                    id="long-menu"
                    anchorEl={this.props.anchorEl}
                    keepMounted
                    open={this.props.anchorEl}
                    onClose= {this.props.handleCloseDelete}
                    PaperProps={{
                        style: {
                        maxHeight: ITEM_HEIGHT * 4.0,
                        width: 80,
                        },
                    }}
                    >
                    {options.map(option => (
                    <MenuItem 
                        key={option} 
                        selected={option === 'Apagar'} 
                        onClick={() => this.props.handleDelete()}
                    >
                        {option}
                    </MenuItem>
                    ))}
                </Menu>
                <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.props.openSnack}
                autoHideDuration={3000}
                onClose={() => this.props.handleAllDelete()}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Resposta Apagada</span>}
                action={[
                <Button key="undo" color="primary" size="small" onClick={() => this.props.handleCloseDelete("revert")}>
                    Desfazer
                </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.props.handleClose("clickaway")}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
                />
        </div>
      )
    }
}

export default UtterDelete;