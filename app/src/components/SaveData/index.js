import React, {Component} from 'react';
import { Save, UtterName, IconMessage} from './style';

class SaveData extends Component {
    render(){
        return(
        <div>
            <Save style = {{background:"#169bd5", color:"#FFFAFA"}} variant="contained" onClick={() => this.handleClick()} >
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