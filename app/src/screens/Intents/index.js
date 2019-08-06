import React, { Component } from 'react';
import SideBar from '../../components/SideBar';
import { IntentName } from './style';


class Intents extends Component {
    constructor(props){
        super(props);
        this.state={
            intent: this.props.location.state ? this.props.location.state : null
        }
    }
    render(){        
        return(
            <div>
                <SideBar onRef={ref => (this.child = ref)} path = '/intents'/>

                {
                    this.state.intent?
                    <IntentName>{this.state.intent.nameIntent}</IntentName>
                    : null
                }
            </div>
        )
    }
}

export default Intents