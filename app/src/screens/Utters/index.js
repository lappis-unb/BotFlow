import React, { Component } from 'react';
import SaveData from '../../components/SaveData';
import Dialog from '../../components/Dialog';
import AlternativeBallons from '../../components/AlternativeBallons';
import UtterSideBar from '../../components/UtterSideBar/index.js';


class Utters extends Component {
    constructor(props){
        super(props);
        this.state = {
            utter: this.props.location.state ? this.props.location.state: null,
            enableSaveButton: false,
            isAlternative:true,
            builtList:false,
            loading:true
        }
    }

    componentDidMount(){
        this.buildList()
    }

    verifyAlternatives(){
        console.log('ta verificando');
        
        var alternatives = this.state.utter['utters']
        var fragments = this.state.utter['utters'][0]['utterText']
        console.log('len',alternatives.length );
        
        if (alternatives.length > fragments.length){
            console.log('é alternativa');
            
            this.setState({isAlternative: true})
        }else{
            this.setState({ isAlternative: false })
        }
    }


    buildList(){
        if(this.state.utter !== null){
            var list = []
            this.state.utter['utters'].forEach(utter => {
                utter['utterText'].forEach(text =>{                    
                    let obj = {
                        key: 'sample-0',
                        edit: false,
                        utterValue: text['text'],
                        utterEdit: '',
                        dialogEnabled: false,
                    }
                    list.push(obj)
                });
            });
            console.log('list',list);
            this.verifyAlternatives()
            this.setState({builtList: list, loading: false})
        }
    }

    clickCheckbox(){
        this.setState({isAlternative: !this.state.isAlternative})
    }

    render(){
        console.log('utter:',this.state.utter)
        return (
            <div>
                <UtterSideBar/>
                {this.state.loading?
                    null
                    :
                    <div>
                        <SaveData utterName={this.state.utter? this.state.utter["nameUtter"]: ''}
                        enableSaveButton={this.state.enableSaveButton}
                        />
                        <AlternativeBallons
                            onClick={() => this.clickCheckbox()}
                            checked={this.state.isAlternative}
                         />
                        <Dialog key="123" utterList={this.state.builtList}
                        stateUpdatingCallback={(stateEnable)=> {this.setState({enableSaveButton: stateEnable})}}
                        />
                    </div>
                }
                
            </div>
        );
    }
}

export default Utters;
