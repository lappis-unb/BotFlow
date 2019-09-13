import React, { Component } from "react";
import { connect } from "react-redux";
import { getIntents, getUtters, saveData, addToStory } from "../reducers/storyReducer";
import Grid from '@material-ui/core/Grid';
import ItemsList from "../components/ItemsList";
//import ToolbarName from '../components/ToolbarName'
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';
import StoryList from '../components/StoryList';
import { Story } from '../utils/DataFormat.js'
import { STORIES_URL } from "../utils/url_routes";
import TextField from '@material-ui/core/TextField';
import ToolbarName from '../components/ToolbarName';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ExampleStory from "../components/ExampleStory";


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
    },
    list: {
        marginTop: '15px',
    },
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
        console.log("PROBLEMA TA NOS PARAMETROS DO ADD TO STORY")
        return (
            <Grid container item xs={12}>
                <Grid container item xs={4} direction='column'>
                    <Grid container direction='row' style={style.grid_item_list}>
                        <Grid item xs={3} sm={6}>
                            <ItemsList
                                icon={<IntentIcon />}
                                text={"Perguntas"}
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
                <Grid item xs={8}
                >
                    <ToolbarName
                        story
                        handleClick={() => this.saveData()}
                    />
                    {/* <button onClick={() => this.saveData()}>SALVAR</button> */}
                    <Grid container item xs={12}
                        direction="row"
                    >
                        <Grid
                            container
                            item xs={6}
                            justify="center"
                            alignItems="flex-start"
                            style={style.list}
                        >
                            <StoryList />
                        </Grid>
                        <Grid container item xs={6}>
                            <ExampleStory />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => ({
    getIntents: () => dispatch(getIntents()),
    getUtters: () => dispatch(getUtters()),
    addToStory: (item) => dispatch(addToStory(item)),
    saveData: (url, item) => dispatch(saveData(url, item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
