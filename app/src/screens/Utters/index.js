import React, { Component } from 'react';
import SaveData from '../../components/SaveData';
import Dialog from '../../components/Dialog';
import AlternativeBallons from '../../components/AlternativeBallons';
import UtterSideBar from '../../components/UtterSideBar/index.js';
import axios from 'axios';

class Utters extends Component {
    constructor(props){
        super(props);
        this.state = {
            utter: this.props.location.state ? this.props.location.state: null,
            enableSaveButton: false,
            isAlternative:true,
            builtList:false,
            loading:true,
            newUtter: {},
            name: this.props.location.state['nameUtter']
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
            var list = [];
            var i = 0;
            this.state.utter['utters'].forEach(utter => {
                utter['utterText'].forEach(text =>{                    
                    let obj = {
                        key: 'sample-' + i,
                        edit: false,
                        utterValue: text['text'],
                        utterEdit: '',
                        dialogEnabled: false,
                    }
                    list.push(obj);
                    i ++;
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

    changeName(event){        
        this.setState({ name: event.target.value})
    }

    buildNewUtter(){
        console.log('list',this.state.builtList);
        
        var obj = {
            utters:[],
            nameUtter: this.state.name
        }        

        if(this.state.isAlternative){
            this.state.builtList.forEach(utter => {
                let u1= {
                    utterText: [
                        {text: utter.utterValue}
                    ]
                }                
                obj.utters.push(u1)
            });

        } else {
            var u2 = {
                utterText: []
            }
            this.state.builtList.forEach(utter => {
                let u21 = {text: utter.utterValue}
                u2.utterText.push(u21)
            });
            obj.utters.push(u2)
        }
        this.setState({newUtter: obj})
        console.log('new utter AKI ====>', obj);
        
    }

    async save(){
        console.log('oie');
        
        await this.buildNewUtter()
        const url = 'https://botflow.api.lappis.rocks/utter/' + this.state.utter._id;
        await axios.put(url,this.state.newUtter)
        .then((res) => {
            console.log(res);
            var obj = {
                _id: this.state.utter._id,
                ...this.state.newUtter,
                projectName: this.state.utter.projectName
            }
            this.props.history.replace('', obj);
        })
        
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
                        <SaveData utterName={this.state.name}
                        enableSaveButton={this.state.enableSaveButton}
                        onClick={() => this.save()}
                        onChange={(text) => this.changeName(text)}
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
