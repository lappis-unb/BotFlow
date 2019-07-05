import React, { Component } from 'react';
import { Button} from '@material-ui/core';
import { DialogBox, Delete, Add} from './style';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default class Dialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = { open: false, setOpen: false,
      dialog: this.props.utterList? this.props.utterList : [
        {
          key: 'sample-0',
          edit: false,
          utterValue: '',
          utterEdit: '',
          dialogEnabled: false,
        }
      ],
      dialogTemp: [
        {
          key: 'sample-0',
          edit: false,
          utterValue: '',
          utterEdit: '',
          dialogEnabled: false,
        },
      ],
    };
  }

  handleClick = () => {
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    const lastData = objectsDialog[objectsDialog.length -1]
    lastData.key.split('-');
    console.log(parseInt(lastData.key.split('-')[1])+1)
    objectsDialog.push({
      key: `sample-${parseInt(lastData.key.split('-')[1])+1}`,
      edit: false,
      utterValue: '',
      utterEdit: '',
      dialogEnabled: false,
    });
    this.setState({ dialog: objectsDialog });
  };

  handleEdit(key) {
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    objectsDialog.filter((elem) => {
      if (elem.key === key && !elem.edit) {
        elem.edit = true;
        elem.key += '-edit';
      }
      return elem;
    });
    this.setState({ dialog: objectsDialog });
  }

  editText({ e, key }) {
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    objectsDialog.filter((elem) => {
      if (elem.key === key) {
        elem.utterEdit = e.target.value;
      }
      return elem;
    });
    this.setState({ dialog: objectsDialog });
  }

  closeDialog(key) {
    const { dialog } = this.state;
    this.setState({open: true});
    let objectsDialog = Object.assign([], dialog);
    this.setState({ dialogTemp: objectsDialog});
    console.log(objectsDialog)
    objectsDialog = objectsDialog.filter(elem => elem.key !== key);
    if (objectsDialog.length) {
      this.setState({ dialog: objectsDialog });
    }
  }

  handleClose(reason) {
    const { dialogTemp } = this.state;
    if (reason === 'revert') {
      this.setState({ dialog: dialogTemp});
      this.setState({open: false});
      return;
    }
    this.setState({open: false});
    console.log(this.state.dialog)
  }

  renderButton() {
    const { dialog } = this.state;
    return dialog.map((element) => {
      const {
        key, edit, utterValue, dialogEnabled,
      } = element;
      return dialogEnabled ? (
        ''
      ) : (

            <DialogBox key={key}>
              <textarea
                defaultValue={utterValue}
                placeholder="Digite o conteudo da utter"
                onChange={e => this.editText({ e, key })}
              />
              <Delete color="#0000" onClick={() => this.closeDialog(key)}>
                <Delete />
              </Delete>
              <Snackbar
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={() => this.handleClose()}
                ContentProps={{
                  'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">Resposta Apagada</span>}
                action={[
                  <Button key="undo" color="primary" size="small" onClick={() => this.handleClose("revert")}>
                    Desfazer
                </Button>,
                  <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.handleClose("clickaway")}
                  >
                    <CloseIcon />
                  </IconButton>
                ]}
              />
          <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={this.state.open}
            autoHideDuration={3000}
            onClose={() => this.handleClose()}
            ContentProps={{
            'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Resposta Apagada</span>}
            action={[
            <Button key="undo" color="primary" size="small" onClick={() => this.handleClose("revert")}>
                Desfazer
            </Button>,
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => this.handleClose("clickaway")}
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
        < Add variant="contained" left="250px" onClick={() => this.handleClick()} >
          Novo balão de resposta
        </Add>
      </div>
    );
  }
}
