import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DialogBox } from './style';

export default class Dialog extends Component {
  constructor(props) {
    super(props);
    this.state = { edit: false, utterEdit: '' };
    this.handleEdit = this.handleEdit.bind(this);
    this.editText = this.editText.bind(this);
    this.confirmEdit = this.confirmEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  componentDidMount() {
    const { utterValue } = this.state;
    this.setState({ utterEdit: utterValue });
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
    this.props.utterValue = utterEdit;
    this.setState({ utterEdit: '' });
    this.setState({ edit: false });
  }

  cancelEdit() {
    this.setState({ utterEdit: '' });
    this.setState({ edit: false });
  }

  render() {
    const { key, utterValue } = this.props;
    const { edit } = this.state;
    return (
      <DialogBox key={key} onClick={this.handleEdit}>
        {!edit && (
          <p>
            {utterValue === ''
              ? 'Digite o conteudo da utter'
              : utterValue}
          </p>
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
