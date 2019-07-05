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

  checkEnableSaveButton = () => {
    var i = 0;
    const {dialog} = this.state;
    const objectsDialog = Object.assign([], dialog);
    for (i=0; i<objectsDialog.length; i++) {
      if (objectsDialog[i].utterValue != '' ){
        return true;
      }
    }
    return false;
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
      dialogEnabled: false,
    });
    this.setState({ dialog: objectsDialog });
  };

  handleEdit(key) {
    this.setState({dialogTemp:this.state.dialog})
    console.log(this.state.dialogTemp)
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
    var i = 0;
    var shouldcheck = false;
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    objectsDialog.filter((elem) => {
      if (elem.key === key) {
        elem.utterValue = e.target.value;
      }
      return elem;
    });
    for (i=0; i<objectsDialog.length; i++) {
      if ((objectsDialog[i].utterValue != '')) {
        shouldcheck = true;
      }
    }
    console.log("qualquertexto")
    console.log(objectsDialog)
    if (shouldcheck){
      this.props.stateUpdatingCallback(this.checkEnableSaveButton);
    } else {
      this.props.stateUpdatingCallback(shouldcheck);
    }
    this.setState({ dialog: objectsDialog });
  }

  closeDialog(key) {
    var i = 0;
    var shouldcheck = false;
    const { dialog } = this.state;
    this.setState({open: true});
    let objectsDialog = Object.assign([], dialog);
    this.setState({ dialogTemp: objectsDialog});
    for (i=0; i<objectsDialog.length; i++) {
      if (objectsDialog[i].key !== key && (objectsDialog[i].utterValue != '' || objectsDialog[i].utterValue != '')) {
        shouldcheck = true;
      }
    }
    objectsDialog = objectsDialog.filter(elem => elem.key !== key);
    if (objectsDialog.length) {
      this.setState({ dialog: objectsDialog });
      if (shouldcheck){
        this.props.stateUpdatingCallback(this.checkEnableSaveButton);
      } else {
        this.props.stateUpdatingCallback(shouldcheck);
      }
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
        key, utterValue, dialogEnabled,
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
