import React, { Component } from 'react';
import SaveData from '../../components/SaveData';
import Dialog from '../../components/Dialog';
import AlternativeBallons from '../../components/AlternativeBallons';
import UtterSideBar from '../../components/UtterSideBar/index.js';
import UtterDelete from '../../components/UtterDelete';
import axios from 'axios';
import NavBar from '../../components/NavBar';

class Utters extends Component {
    constructor(props){
        super(props);
        this.state = {
            utter: this.props.location.state ? this.props.location.state: null,
            openSnack: false,
            createUtter: false,
            editUtter: false,
            enableSaveButton: false,
            checkClickChekbox: false,
            checkChangeName: false,
            isAlternativeTemp: true,
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
            nameTemp: '',
            deleteTemp: true,
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
        console.log('textoqualquer')
        console.log(this.state.utter);
        var cleanText = false
        if(this.state.utter !== null){
            var list = [];
            var i = 0;
            if(this.state.utter['utters'].length > 0){
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
                this.verifyAlternatives()
            }else{
                let obj = {
                    key: 'sample-' + i,
                    edit: false,
                    utterValue: '',
                    utterEdit: '',
                    dialogEnabled: false,
                }
                list.push(obj);
                this.setState({ isAlternative: false })
                cleanText = true
            }
            console.log('list',list);
            this.setState({dialog: list, loading: false})
        }else{
            cleanText = true
        }
        this.setState({isCleanDialog: cleanText})
    }

    clickCheckbox(){
        if(this.state.deleteTemp === true){
            const { dialog } = this.state;
            const objectsDialog = Object.assign([], dialog);
            this.setState({isAlternative: !this.state.isAlternative})
            if((this.state.name !== '' && objectsDialog.length >= 2) || this.state.checkClickChekbox === true){
                this.setState({checkClickChekbox: !this.state.checkClickChekbox})
            }
        }
    }

    changeName(event){
        var regex = /^(([A-Z]|[a-z]|[0-9]|_)*)$/;
        var text = event.target.value;
        
        if (regex.test(text)){
            this.setState({ name: text})
            if(this.state.name !== '' || this.state.checkChangeName === true){
                this.setState({ checkChangeName: text})
            } 
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
        console.log(this.state.utter._id)
        if(this.state.utter._id ){
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
        }else {
            const url = 'https://botflow.api.lappis.rocks/project/utter/' 
            await axios.post(url,this.state.newUtter)
            .then((res) => {
                console.log(res);
                var obj = {
                    ...this.state.newUtter,
                    projectName: this.state.utter.projectName
                }
                this.props.history.replace('', obj);
            })
        }
        window.location.reload()
    }

    async delete(){
        const url = 'https://botflow.api.lappis.rocks/utter/' + this.state.utter._id;
        await axios.delete(url)
        .then((res) => {
            console.log(res);
        })
        await this.setState({ openSnack: false});
        await this.setState({ deleteTemp: false });
        await this.child.changeUtterOnDelete(this.state.utter._id);
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

    //Funções utterDelete

    handleClickMenu(e){
        console.log(e);
        this.setState({ anchorEl: e.currentTarget })
    }

    handleDelete(){
        this.setState({ anchorEl: null })
        this.setState({ deleteTemp: false});
        this.setState({ openSnack: true });
    }
    
    handleCloseDelete(reason){
        this.setState({ deleteTemp: true});
        if (reason === 'revert') {
            this.setState({ openSnack: false });
        }
        this.setState({ openSnack: false });
    }
    
    
    
    stateUpdatingCallback(stateEnable){
        this.setState({ enableSaveButton: stateEnable })
    }

    
    render(){
        const { dialog } = this.state;
        const objectsDialog = this.state.deleteTemp? Object.assign([], dialog): [];
        console.log(this.state.openSnack);
        return (
            <div>
                <NavBar/>
            <div style={{marginTop: '3%'}}>
                <UtterSideBar onRef={ref =>(this.child = ref)}/>
                {this.state.loading?
                    null
                    :
                    <div>
                        <SaveData 
                            utterName={this.state.deleteTemp? this.state.name: ''}
                            enableSaveButton={
                                (this.state.isCleanDialog === false && this.state.name !== "" && ((this.state.isAlternative === true && objectsDialog.length >= 2 ) || this.state.isAlternative === false)) &&
                                (this.state.enableSaveButton || this.state.checkChangeName || this.state.checkClickChekbox)
                            }
                            onClick={() => this.save()}
                            onChange={(text) => this.changeName(text)}
                            />
                        <UtterDelete 
                            anchorEl={this.state.anchorEl}
                            handleClickMenu = {(e) => this.handleClickMenu(e)}
                            handleDelete = {() => this.handleDelete()}
                            delete = {() => this.delete()}
                            handleCloseDelete = {(reason) => this.handleCloseDelete(reason)}
                            openSnack= {this.state.openSnack}
                            />
                        <AlternativeBallons
                            onClick={() => this.clickCheckbox()}
                            checked={this.state.deleteTemp? this.state.isAlternative: false}
                         />
                        <Dialog key="123" utterList={this.state.deleteTemp? this.state.dialog: []}
                            handleClick = {() => this.handleClick()}
                            editText = {(e) => this.editText(e)}
                            handleClose = {(e) => this.handleClose(e)}
                            closeDialog = {(e) => this.closeDialog(e)}
                            open= {this.state.open}
                        />
                    </div>
                }
                
            </div>
            </div>
        );
    }
}

export default Utters;
