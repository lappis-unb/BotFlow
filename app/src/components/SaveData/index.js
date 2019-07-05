import React, {Component} from 'react';
import { Save, UtterName, IconMessage} from './style';
import {Dialog} from '../Dialog/index.js'

class SaveData extends Component {

    constructor() {
        super();
        this.state = { enable: '', backgroundColor:'#DCDCDC' };
    }
    render(){
        var enableSaveButton = this.props.enableSaveButton?"#1E90FF":"#dcdcdc";
        return(
        <div>
            <Save style = {{background: enableSaveButton, color:"#FFFAFA"}} 
                variant="contained" 
                disabled={!this.props.enableSaveButton}
                onClick={() => this.handleClick()} >
                Gravar
            </Save>
            <IconMessage style = {{marginLeft: 200, marginTop:60, width:35, height:35}}>
                </IconMessage>
            <UtterName
                id="filled-email-input"
                label="Nome da Resposta"
                type="Nome da Resposta"
                name="Nome da Resposta"
                autoComplete="Nome da Resposta"
                margin="normal"
                variant="filled"
                value= {this.props.utterName? this.props.utterName : ""}
            />
            <hr></hr>
        </div>

        )
    }
}

export default SaveData;