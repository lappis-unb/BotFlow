import React, { Component } from 'react';
import Dialog  from './../Dialog/index.js';
import Button from '@material-ui/core/Button';

  export default class AddDialog extends Component {
    constructor() {
      super();
      this.state = {
        addDialog: false,
      }
    }

    handleClick = () => {
        this.setState({
           addDialog: true,
       })
    }

    render(){
        const { addDialog } = this.state;
        return(
            <div>   
                <div className="Dialog">
                  {addDialog && <Dialog />}
            <Button variant="outlined" component="span" onClick={this.handleClick}>
                Adicionar
            </Button>
                </div> 
            </div>
        );
    }
}