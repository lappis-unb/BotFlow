import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DialogBox } from './style';
import DeleteIcon from '@material-ui/icons/Delete';
  
  export default class Dialog extends Component {
    constructor() {
      super();
      this.state = {
        key: 'sample', edit: false, utterValue: '', utterEdit: '', focus: false, Dialog: false
      };
      this.handleEdit = this.handleEdit.bind(this);
      this.editText = this.editText.bind(this);
      this.confirmEdit = this.confirmEdit.bind(this);
      this.cancelEdit = this.cancelEdit.bind(this);
      this.closeDialog = this.closeDialog.bind(this)
    }

  handleEdit() {
    const { edit } = this.state;
    if (!edit) {
      this.setState({ edit: true });
    }
  }

  editText(e) {
    this.setState({ utterEdit: e.target.value });
  }

  confirmEdit() {
    const { utterEdit } = this.state;
    this.setState({ utterValue: utterEdit });
    this.setState({ utterEdit: '' });
    this.setState({ edit: false });
  }

  cancelEdit() {
    this.setState({ utterEdit: '' });
    this.setState({ edit: false });
  }

  closeDialog() {
    this.setState({ Dialog: true });
  }


  render() {
    const { key, edit, utterValue } = this.state;
    // const classes = useStyles();
    return ( 
      this.state.Dialog ? '' : <DialogBox key={key} onClick={this.handleEdit}>
        {!edit && (
          <>
            <p>
            {utterValue === ''
              ? 'Digite o conteudo da utter'
              : utterValue}
            </p>
            <Button color="#0000" onClick={this.closeDialog}>
              <DeleteIcon />
            </Button>
          </>
        )}
        {edit && (
          <>
            <textarea
              defaultValue={utterValue}
              placeholder="Digite o conteudo da utter"
              onChange={this.editText}
              onFocus={this.handleEdit}
            />
            <Button color="primary" onClick={this.confirmEdit}>
              Confirmar
            </Button>
            <Button color="secondary" onClick={this.cancelEdit}>
              Cancelar
            </Button>
          </>
        )}
      </DialogBox>
    );
  }
}
