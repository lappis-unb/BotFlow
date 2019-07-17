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
            checkClickChekbox: false,
            checkChangeName: false,
            isAlternative:true,
            isCleanDialog: true,
            dialog: [
                {
                    key: 'sample-0',
                    edit: false,
                    utterValue: '',
                    dialogEnabled: false,
                }
            ],
            dialogTemp: [
                {
                    key: 'sample-0',
                    edit: false,
                    utterValue: '',
                    dialogEnabled: false,
                },
            ],
            loading:true,
            newUtter: {},
            name: this.props.location.state ? this.props.location.state['nameUtter'] : '',
            open: false
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
        var cleanText = false
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
                    if(text['text'] === ""){
                        cleanText = true
                    }
                });
            });
            console.log('list',list);
            this.verifyAlternatives()
            this.setState({dialog: list, loading: false})
        }else{
            cleanText = true
        }
        this.setState({isCleanDialog: cleanText})
    }

    clickCheckbox(){
        const { dialog } = this.state;
        const objectsDialog = Object.assign([], dialog);
        this.setState({isAlternative: !this.state.isAlternative})
        if((this.state.name !== '' && objectsDialog.length >= 2) || this.state.checkClickChekbox === true){
            this.setState({checkClickChekbox: !this.state.checkClickChekbox})
        }
    }

    changeName(event){     
        var nameUtter   
        this.setState({ name: event.target.value})
        if(this.state.name !== '' || this.state.checkChangeName === true){
            this.setState({ checkChangeName: event.target.value})
        }
    }

    buildNewUtter(){
        console.log('list',this.state.dialog);
        
        var obj = {
            utters:[],
            nameUtter: this.state.name
        }        

        if(this.state.isAlternative){
            this.state.dialog.forEach(utter => {
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
            this.state.dialog.forEach(utter => {
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

//////// Funções para o Dialog

    checkEnableSaveButton = () => {
        var i = 0;
        const { dialog } = this.state;
        const objectsDialog = Object.assign([], dialog);
        for (i = 0; i < objectsDialog.length; i++) {
            if (objectsDialog[i].utterValue !== '') {
                return true;
            }
        }
        return false;
    }

    handleClick = async () => {
        const { dialog } = this.state;
        const objectsDialog = Object.assign([], dialog);
        const lastData = objectsDialog[objectsDialog.length - 1]
        lastData.key.split('-');
        console.log(parseInt(lastData.key.split('-')[1]) + 1)
        objectsDialog.push({
            key: `sample-${parseInt(lastData.key.split('-')[1]) + 1}`,
            edit: false,
            utterValue: '',
            dialogEnabled: false,
        });
        await this.setState({ dialog: objectsDialog });
        console.log('dialog?????????');
        this.setState({isCleanDialog: true});

    };

    async editText({ e, key }) {
        var i = 0;
        var shouldcheck = false;
        var cleanText = false;
        const { dialog } = this.state;
        const objectsDialog = Object.assign([], dialog);
        objectsDialog.filter((elem) => {
            if (elem.key === key) {
                elem.utterValue = e.target.value;
            }
            return elem;
        });
        for (i = 0; i < objectsDialog.length; i++) {
            if ((objectsDialog[i].utterValue !== '')) {
                shouldcheck = true;
            }else {
                cleanText = true;
            }
        }
        this.setState({isCleanDialog: cleanText || e.target.value === ""});

        if (shouldcheck) {
            this.stateUpdatingCallback(this.checkEnableSaveButton);
        } else {
            this.stateUpdatingCallback(shouldcheck);
        };
        await this.setState({ dialog: objectsDialog });
    }

    handleClose(reason) {
        const { dialogTemp } = this.state;
        if (reason === 'revert') {
            this.setState({ dialog: dialogTemp });
            this.setState({ open: false });
            return;
        }
        this.setState({ open: false });
    }

    closeDialog(key) {
        var i = 0;
        var shouldcheck = false;
        var cleanText = false;
        const { dialog } = this.state;
        this.setState({ open: true });
        let objectsDialog = Object.assign([], dialog);
        this.setState({ dialogTemp: objectsDialog });
        for (i = 0; i < objectsDialog.length; i++) {
            if (objectsDialog[i].key !== key && objectsDialog[i].utterValue !== '') {
                shouldcheck = true;
            }else if( objectsDialog[i].key !== key){
                cleanText = true;
            }
        }
        this.setState({isCleanDialog: cleanText});

        objectsDialog = objectsDialog.filter(elem => elem.key !== key);
        if (objectsDialog.length) {
            this.setState({ dialog: objectsDialog });
            if (shouldcheck) {
                this.stateUpdatingCallback(this.checkEnableSaveButton);
            } else {
                this.stateUpdatingCallback(shouldcheck);
            }
        }
    }

    stateUpdatingCallback(stateEnable){
        this.setState({ enableSaveButton: stateEnable })
    }


    render(){
        const { dialog } = this.state;
        const objectsDialog = Object.assign([], dialog);
        console.log('utter:',this.state.utter)
        return (
            <div>
                <UtterSideBar/>
                {this.state.loading?
                    null
                    :
                    <div>
                        <SaveData utterName={this.state.name}
                        enableSaveButton={
                            (this.state.isCleanDialog === false && this.state.name !== "" && ((this.state.isAlternative === true && objectsDialog.length >= 2 ) || this.state.isAlternative === false)) &&
                            (this.state.enableSaveButton || this.state.checkChangeName || this.state.checkClickChekbox)
                        }
                        onClick={() => this.save()}
                        onChange={(text) => this.changeName(text)}
                        />
                        <AlternativeBallons
                            onClick={() => this.clickCheckbox()}
                            checked={this.state.isAlternative}
                         />
                        <Dialog key="123" utterList={this.state.dialog}
                        handleClick = {() => this.handleClick()}
                        editText = {(e) => this.editText(e)}
                        handleClose = {(e) => this.handleClose(e)}
                        closeDialog = {(e) => this.closeDialog(e)}
                        open= {this.state.open}
                        />
                    </div>
                }
                
            </div>
        );
    }
}

export default Utters;
