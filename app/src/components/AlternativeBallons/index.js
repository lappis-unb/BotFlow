import React, { Component } from 'react';
import { Check} from './style';

class AlternativeBallons extends Component{

    render(){
        return(
            <div>
                <Check
                value="checkedA"
                color="default"
                checked={this.props.checked}
                onChange={this.props.onClick}
                />
                <div style = {{marginLeft: 700, marginTop:20}}>
                    Balões são falas alternativas
                </div>
            </div>
        );
    }
}

export default AlternativeBallons;