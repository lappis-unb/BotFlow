import React, {Component} from 'react';
import { Save, UtterName, IconMessage} from './style';
import {Tooltip} from '@material-ui/core';

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
                onClick={this.props.onClick}>
                Gravar
            </Save>
            <IconMessage style = {{marginLeft: 200, marginTop:60, width:35, height:35}}/>

            <Tooltip title="O nome da resposta não pode ter acentos, espaços ou caracteres especiais. Só podem letras, números e underline.">
                <UtterName
                    id="filled-email-input"
                    label="Nome da Resposta"
                    type="Nome da Resposta"
                    name="Nome da Resposta"
                    autoComplete="Nome da Resposta"
                    margin="normal"
                    variant="filled"
                    value= {this.props.utterName? this.props.utterName: ""}
                    onChange={this.props.onChange}
                    />
            </Tooltip>

            <hr></hr>
        </div>

        )
    }
}

export default SaveData;