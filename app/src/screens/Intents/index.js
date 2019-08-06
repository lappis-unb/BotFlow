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
        console.log('oi', this.state.intent.nameIntent);
        
        return(
            <div>
                <SideBar onRef={ref => (this.child = ref)} path = '/intents'/>
                <IntentName>{this.state.intent.nameIntent}</IntentName>
            </div>
        )
    }
}

export default Intents