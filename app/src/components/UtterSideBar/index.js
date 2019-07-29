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
            utters: [],
            loading: true,
            selected_utter: 0,
            createUtter: false,
            editUtter: false,
            active: this.props.location.state ? this.props.location.state: -1,
        }
    }   
    async componentDidMount() {
        await this.getUtters();
        if(this.state.loading === true){
            this.sortUtterName();
            this.setState({ loading: false })
            this.props.onRef(this);
            console.log(this.state.utters);
        }
    }

    async componentWillUnmount(){
        this.props.onRef(undefined);
    }

    async getUtters() {
        var utter_list = []
        await axios.get("https://botflow.api.lappis.rocks/project/utter")
            .then((res) => {
                res.data.forEach(utter => {
                    utter_list.push(utter)
                });
            })
        await this.setState({ utters: utter_list })
    }

    truncateText(text) {
        if (text.length > 20) {
            return text.substring(0, 17) + "..."
        }
        return text
    }

    async openUtter(key){
        console.log(this.state.utters[this.state.selected_utter])
        await this.setState({ selected_utter: key });
        await this.props.history.push('/', this.state.utters[this.state.selected_utter]);
        
        console.log(this.state.active)
    
        this.setState({ active: key });    
        console.log(this.state.active === key)
        console.log(this.state.active)
        //window.location.reload()
    }
    setActive(key){
        
    }

    async changeUtterOnDelete(deletedId){
        await deletedId !== this.state.utters[0]._id ? this.openUtter(0): this.openUtter(1);
    }

    sortUtterName = function(){
        // sorts alphabetically utters in sidebar
        this.state.utters.sort(function(a, b){
            if(a['nameUtter'] <  b['nameUtter']) { return -1; }
            if(a['nameUtter'] >  b['nameUtter']) { return 1; }
            return 0;
        })
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
                    <List>
                            <ListItem> 
                                < Add variant="contained" 
                                onClick={() => {this.props.history.push('/', {
                                    utters:[],nameUtter:'', projectName:'project',});
                                    window.location.reload();
                                    }
                                }
                                 >
                                    Criar nova resposta
                                </Add>      
                            </ListItem>
                        {this.state.utters.map((utter, key) => (
                            <ListItem button key={key} selected={this.state.active === key} onClick={() => { this.openUtter(key)}}>
                                <ListItemText primary={this.truncateText(utter.nameUtter)} />
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

