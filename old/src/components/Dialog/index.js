import React, { Component } from 'react';
import { Button} from '@material-ui/core';
import { DialogBox, Delete, Add} from './style';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


export default class Dialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = { open: this.props.open, setOpen: false, 
      dialog: this.props.utterList? this.props.utterList : [
        {
          key: 'sample-0',
          edit: false,
          utterValue: '',
          dialogEnabled: false,
        }
      ],
      dialogTemp: [
        {
          key: 'sample-0',
          edit: false,
          utterValue: '',
          dialogEnabled: false,
        },
      ],
    };
  }

  renderButton() {
    var  dialog = this.props.utterList.length > 0? this.props.utterList : [
      {
        key: 'sample',
        edit: false,
        utterValue: '',
        dialogEnabled: false,
      }
    ]
    return dialog.map((element) => {
      const {
        key, utterValue, dialogEnabled,
      } = element;
      return dialogEnabled ? (
        ''
      ) : (

            <DialogBox key={key}>
              <textarea
                defaultValue={utterValue}
                placeholder="Digite o conteudo da utter"
                onChange={e => this.props.editText({ e, key })}
              />
              <Delete color="#0000" onClick={() => this.props.closeDialog(key)}>
                <Delete />
              </Delete>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.props.open}
                autoHideDuration={3000}
                onClose={() => this.props.handleClose()}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Resposta Apagada</span>}
                action={[
                  <Button key="undo" color="primary" size="small" onClick={() => this.props.handleClose("revert")}>
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
        </DialogBox>
      );
    });
  }

  render() {    
    return (
      <div>
        {this.renderButton()}
        < Add variant="contained" left="250px" onClick={this.props.handleClick} >
          Novo balão de resposta
        </Add>
      </div>
    );
  }
}