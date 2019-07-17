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
        }
    }

    async componentDidMount() {
        await this.getUtters();
        this.setState({ loading: false })
        console.log(this.state.utters);

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
        await this.setState({ selected_utter: key });
        await this.props.history.push('/', this.state.utters[this.state.selected_utter])
        window.location.reload()
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
                            < Add variant="contained" onClick={this.props.handleClick} >
                                Criar nova resposta
                            </Add>      
                        </ListItem>
                        {this.state.utters.map((utter, key) => (
                            <ListItem button key={key} onClick={() => { this.openUtter(key)}}>
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

