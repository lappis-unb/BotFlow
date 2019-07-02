import React, { Component } from 'react';
import SaveData from '../../components/SaveData';
import Dialog from '../../components/Dialog';
import AlternativeBallons from '../../components/AlternativeBallons';
import axios from 'axios';
import {
    List, ListItem, ListItemText,
} from '@material-ui/core';
import { SideNav } from './style';


class Utters extends Component {
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
        this.setState({loading: false })
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
        await this.setState({utters: utter_list})
        var list = await this.mountTextList()
        await this.setState({ textList: list })

    }

    mountTextList(){
        var list = []
        console.log(this.state.utters[this.state.selected_utter]["nameUtter"]);
        
        this.state.utters[this.state.selected_utter].utters.forEach(alt => {
            list.push(alt["utterText"])
        });
        return list
    }

    truncateText(text){
        if (text.length > 20){
            return text.substring(0,17) + "..."
        }
        return text
    }

    renderSideMenu() {
        return (
            <SideNav
                variant="permanent"
                anchor="left"
            >
                <List>
                    {this.state.utters.map((utter, key) => (
                        <ListItem button key={utter} onClick={() => { this.setState({ selected_utter: key}); console.log(this.state.utters[key]);}}>
                            <ListItemText primary={this.truncateText(utter.nameUtter)} />
                        </ListItem>
                    ))}
                </List>
            </SideNav>
        );
    };

    render(){
        return (
            <div>
                {
                this.state.loading ?
                    null
                :
                    <div>
                        {this.renderSideMenu()}
                        <SaveData utterName={this.state.utters[this.state.selected_utter]["nameUtter"]}/>
                        <AlternativeBallons />
                        <Dialog key="123" utterValue={this.mountTextList()} />
                    </div>
                }
            </div>
        );
    }
}

export default Utters;
