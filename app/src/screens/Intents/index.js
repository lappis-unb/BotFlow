import React, { Component } from 'react';
import UtterSideBar from '../../components/UtterSideBar/index.js';


class Intents extends Component {
    render(){
        return(
            <div>

                <UtterSideBar onRef={ref => (this.child = ref)} path = '/intents'/>

            </div>
        )
    }
}

export default Intents