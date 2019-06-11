import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import { DialogBox } from './style';
import {Delete} from './style';
  
  export default class Dialog extends Component {
    constructor() {
      super();
      this.state = {
        buttons: [1,1]
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

  handleClick = () => {
    var buttons = this.state.buttons
    buttons = buttons.concat(1)
    this.setState({
       buttons: buttons,  
   })
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

  renderButton(){
    var key = 'sample'
    var edit =  false
    var utterValue =  ''
    var utterEdit =  ''
    var focus =  false 
    var Dialog = false
    return (
    Dialog ? '' : <DialogBox key={key} onClick={this.handleEdit}>
        {!edit && (
          <>
            <p>
            {utterValue === ''
              ? 'Digite o conteudo da utter'
              : utterValue}
            </p>
            <Delete color="#0000" onClick={this.closeDialog}>
              <Delete/>
            </Delete>
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
    )
  }


  render() {
    return ( 
    <div>
        {this.state.buttons.map(() => this.renderButton())}
        <Button variant="outlined" component="span" onClick={this.handleClick}>
            <h1>Adicionar</h1>
        </Button>
    </div>
    );
  }
}
