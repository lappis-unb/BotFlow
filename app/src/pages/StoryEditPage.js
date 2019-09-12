import React, { Component } from "react";
import { connect } from "react-redux";
import { getIntents, getUtters, saveData, addToStory } from "../actions/storiesAction";
import Grid from '@material-ui/core/Grid';
import ItemsList from "../components/ItemsList";
//import ToolbarName from '../components/ToolbarName'
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';
import StoryList from '../components/StoryList';
import { Story } from '../utils/DataFormat.js'
import { STORIES_URL } from "../utils/url_routes";
import TextField from '@material-ui/core/TextField';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const style = {
    grid_item_list: {
        background: "#dae8ea",
        paddingTop: '15px'
    },
    list_container: {
        paddingLeft: "24px"
    },
    filter_items_container: {
        padding: "12px 8px"
    }
}

class StoryEditPage extends Component {
    constructor(props) {
        super(props);
        this.props.getIntents()
        this.props.getUtters()
        this.state = {
            value: ""
        };
    }

    filterItems(items = []) {
        return items.filter(item => (item.name).includes(this.state.value));
    }

    handleFilterClick() {
        this.setState({ value: "" });
        this.filterItems();
    }

    handleFilterInput(e) {
        this.setState({ value: e.target.value });
        this.filterItems();
    }

    getFilterIcon() {
        if ((this.state.value).trim().length === 0) {
            return <SearchIcon />
        } else {
            return (
                <CloseIcon
                    onClick={() => this.handleFilterClick()}
                    style={{ cursor: "pointer" }}
                />
            )
        }
    }
    saveData() {
        let data = new Story(this.props.id_item, this.props.name_item, this.props.item_contents);
        this.props.saveData(STORIES_URL, data);
    }

    render() {
        return (
            <Grid container xs={12}>
                <Grid container xs={5} direction='column'>
                    <Grid container direction='row' style={style.grid_item_list}>
                        <Grid item xs={3} sm={6}>
                            <ItemsList
                                icon={<IntentIcon />}
                                text={"Perguntas"}
                                value={this.state.value}
                                actionOnClick={this.props.addToStory}
                                items={this.filterItems(this.props.intents)}
                                selected_item_position={this.props.selected_item_position}
                            />
                        </Grid>
                        <Grid item xs={3} sm={6}>
                            <ItemsList
                                icon={<UtterIcon />}
                                text={"Resposta"}
                                value={this.state.value}
                                actionOnClick={this.props.addToStory}
                                items={this.filterItems(this.props.utters)}
                                selected_item_position={this.props.selected_item_position}
                            />
                        </Grid>
                    </Grid>
                    <div style={style.filter_items_container}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Filtrar"
                            variant="outlined"
                            value={this.state.value}
                            style={style.field_form}
                            InputProps={{ endAdornment: this.getFilterIcon() }}
                            onChange={(e) => this.handleFilterInput(e)}
                        />
                    </div>
                </Grid>
                <Grid item xs={7}>
                    <button onClick={() => this.saveData()}>SALVAR</button>
                    {/*                     <ToolbarName
                        url={this.props.url}
                        mode={this.props.mode}
                        items={this.props.items}
                        id_item={this.props.id_item}
                        new_item={this.props.new_item}
                        name_item={this.props.current_item.name}
                        name_label={"Nome da conversa"}
                        helper_text={this.props.helper_text}
                        old_name_item={this.props.old_name_item}
                        item_contents={this.props.item_contents}
                        setDataFormat={this.props.setDataFormat}
                        multiple_alternatives={this.props.multiple_alternatives}
                        old_item_contents={this.props.old_item_contents}
                    /> */}
                    <Grid style={{ display: 'flex' }}>
                        <Grid item xs={6}>
                            <StoryList />
                        </Grid>
                        <Grid item xs={6}>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => { return { ...state.storyReducer } };

const mapDispatchToProps = dispatch => ({
    getIntents: () => dispatch(getIntents()),
    getUtters: () => dispatch(getUtters()),
    addToStory: (item) => dispatch(addToStory(item)),
    saveData: (url, item) => dispatch(saveData(url, item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
