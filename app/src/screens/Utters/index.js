import React, { Component } from 'react';
import SaveData from '../../components/SaveData';
import Dialog from '../../components/Dialog';
import AlternativeBallons from '../../components/AlternativeBallons';
import UtterSideBar from '../../components/UtterSideBar/index.js';


class Utters extends Component {
    constructor(props){
        super(props);
        this.state = {
            utter: this.props.location.state ? this.props.location.state: null
        }
    }

    buildList(){
        if(this.state.utter !== null){
            var list = []
            this.state.utter['utters'].forEach(utter => {
                let obj = {
                    key: 'sample-0',
                    edit: false,
                    utterValue: utter['utterText'],
                    utterEdit: '',
                    dialogEnabled: false,
                }
                list.push(obj)
            });
            return list

        }else{
            return false
        }
    }

    render(){
        console.log(this.props.location)
        return (
            <div>
                <UtterSideBar/>
                    <div>
                        <SaveData utterName={this.state.utter? this.state.utter["nameUtter"]: ''}/>
                        <AlternativeBallons />
                        <Dialog key="123" utterList={this.buildList()}/>
                    </div>
                
            </div>
        );
    }
}

export default Utters;
