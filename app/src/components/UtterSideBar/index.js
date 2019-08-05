import React, {Component} from 'react';
import axios from 'axios';
import {
    List, ListItem, ListItemText,
} from '@material-ui/core';
import { SideNav } from './style';
import { withRouter } from 'react-router-dom';
import { Add } from './style';

class UtterSideBar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loading: true,
            selected: 0,
            createUtter: false,
            editUtter: false,
        }
    }

    async componentDidMount() {
        await this.getList();
        if(this.state.loading === true){
            this.sortName();
            this.setState({ loading: false })
            this.props.onRef(this);
            console.log(this.state.list);
        }
    }

    async componentWillUnmount(){
        this.props.onRef(undefined);
    }

    async getList() {
        var url = 'https://botflow.api.lappis.rocks/project' + this.props.path.slice(0,-1)
        console.log('url',url);
        
        var temp_list = []
        await axios.get(url)
            .then((res) => {
                res.data.forEach(item => {
                    temp_list.push(item)
                });
            })
        await this.setState({ list: temp_list })
    }

    truncateText(item) {
        var text = ''
        if (this.props.path == '/utters'){
            text = item.nameUtter
        }else{
            text = item.nameIntent
        }
        
        if (text.length > 20) {
            return text.substring(0, 17) + "..."
        }
        return text
    }

    async open(key){
        var path = this.props.path

        console.log(this.state.list[this.state.selected])
        await this.setState({ selected: key });
        await this.props.history.push(path, this.state.list[this.state.selected]);
        window.location.reload()
    }

    async changeUtterOnDelete(deletedId){
        await deletedId !== this.state.list[0]._id ? this.open(0): this.open(1);
    }

    sortName = function(){
        // sorts alphabetically list in sidebar
        if(this.props.path == '/utters'){
            this.state.list.sort(function(a, b){
                if(a['nameUtter'] <  b['nameUtter']) { return -1; }
                if(a['nameUtter'] >  b['nameUtter']) { return 1; }
                return 0;
            })
        } else if (this.props.path == '/intents'){
            this.state.list.sort(function (a, b) {
                if (a['nameIntent'] < b['nameIntent']) { return -1; }
                if (a['nameIntent'] > b['nameIntent']) { return 1; }
                return 0;
            })
        }
    }

    newItem(){
        var path = this.props.path
        var obj = {}
        if(path == '/utters'){
            obj = {
                list: [], nameUtter: '', projectName: 'project',
            }
        }else if(path == '/intents'){
            obj = {
                list: [], nameIntent: '', projectName: 'project',
            }
        }
        this.props.history.push(path, obj);
        window.location.reload();
    }


    render() {
        return (
            <div>
                {this.state.loading ?
                    null
                :
                    <SideNav
                        variant="permanent"
                        anchor="left"
                    >
                    <List style={{marginTop: '30%'}}>
                            <ListItem> 
                                < Add variant="contained" 
                                onClick={() => this.newItem()}
                                 >
                                    Criar nova {this.props.path == '/utters'?'resposta' : 'pergunta'}
                                </Add>      
                            </ListItem>
                        {this.state.list.map((item, key) => (
                            <ListItem button key={key} onClick={() => { this.open(key);}}>
                                <ListItemText primary={this.truncateText(item)} />
                            </ListItem>
                        ))}
                    </List>
                </SideNav>
                }
            </div>
        );
    };

};
export default withRouter(UtterSideBar);

