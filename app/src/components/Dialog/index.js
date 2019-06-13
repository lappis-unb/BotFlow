import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DialogBox, Delete } from './style';

export default class Dialog extends Component {
  constructor() {
    super();
    this.state = {
      dialog: [
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
    objectsDialog.push({
      key: `sample-${objectsDialog.length}`,
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

  confirmEdit(key) {
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    objectsDialog.filter((elem) => {
      if (elem.key === key) {
        elem.utterValue = elem.utterEdit;
        elem.utterEdit = '';
        elem.edit = false;
        elem.key = elem.key.replace(/-edit/gm, '');
      }
      return elem;
    });
    this.setState({ dialog: objectsDialog });
  }

  cancelEdit(key) {
    const { dialog } = this.state;
    const objectsDialog = Object.assign([], dialog);
    objectsDialog.filter((elem) => {
      if (elem.key === key) {
        elem.edit = false;
        elem.utterEdit = '';
        elem.key = elem.key.replace(/-edit/gm, '');
      }
      return elem;
    });
    this.setState({ dialog: objectsDialog });
  }

  closeDialog(key) {
    const { dialog } = this.state;
    let objectsDialog = Object.assign([], dialog);
    objectsDialog = objectsDialog.filter(elem => elem.key !== key);
    if (objectsDialog.length) {
      this.setState({ dialog: objectsDialog });
    }
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
          {!edit && (
            <>
              <p onClick={() => this.handleEdit(key)}>
                {utterValue === '' ? 'Digite o conteudo da utter' : utterValue}
              </p>
            </>
          )}
          {edit && (
            <>
              <textarea
                defaultValue={utterValue}
                placeholder="Digite o conteudo da utter"
                onChange={e => this.editText({ e, key })}
              />
              <Button color="primary" onClick={() => this.confirmEdit(key)}>
                Confirmar
              </Button>
              <Button color="secondary" onClick={() => this.cancelEdit(key)}>
                Cancelar
              </Button>
            </>
          )}
          <Delete color="#0000" onClick={() => this.closeDialog(key)}>
            <Delete />
          </Delete>
        </DialogBox>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderButton()}
        <Button variant="outlined" component="span" onClick={this.handleClick}>
          <h1>Adicionar</h1>
        </Button>
      </div>
    );
  }
}
