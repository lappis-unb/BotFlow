import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import ItemsList from "../components/ItemsList";
import Typography from '@material-ui/core/Typography';
import Snackbar from '../components/Snackbar';
import { Creators as StoryAction } from "../ducks/stories";
import Divider from '@material-ui/core/Divider';

import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';
import StoryList from '../components/StoryList';
import { Story } from '../utils/DataFormat.js'
import TextField from '@material-ui/core/TextField';
import ToolbarName from '../components/ToolbarName';

import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ExampleStory from "../components/ExampleStory";


const style = {
    grid_item_list: {
        background: "#dae8ea",
        paddingTop: '15px',
        height: "calc(100vh - 74px - 64px - 15px)",
        overflowY: "auto"
    },
    list_container_utter: {
        paddingLeft: "16px",
    },
    list_container_intent: {
        paddingLeft: "16px",
        borderRight:"solid 1px #CCC",
    },
    filter_items_container: {
        padding: "12px 8px",
        background: "#dae8ea",
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
        this.props.getStory(window.location.pathname.split('/').pop())
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

    isButtonEnabled() {
        const first_element_is_intent = (this.props.content.length !== 0 && this.props.content[0].type !== 'utter');
        const contents_changed = JSON.stringify(this.props.content) !== JSON.stringify(this.props.old_content);
        let is_enabled = true;
        const content = this.props.content;
        for (let i = 1, size = content.length; i < size; i++) {
            if (content[i - 1].type === 'intent' && content[i].type === 'intent') {
                is_enabled = false;
            }
        }
        return first_element_is_intent && contents_changed && is_enabled;
    }

    render() {
        return (
            <Grid container item xs={12}>
                <Grid container item xs={4} direction='column'>
                    <Grid container direction='row' style={style.grid_item_list}>
                        <Grid item xs={2} sm={6} style={style.list_container_intent}>
                            <Typography variant="body2" color="primary">
                                Perguntas
                            </Typography>
                            <ItemsList
                                story={true}
                                icon={<IntentIcon />}
                                highlighted_text={this.state.value}
                                actionOnClick={this.props.addIntent}
                                items={this.filterItems(this.props.intents)}
                                content={this.props.content}
                                selected_item_position={this.props.selected_item_position}
                            />
                        </Grid>
                        <Grid item xs={2} sm={6} style={style.list_container_utter}>
                            <Typography variant="body2" color="primary">
                                Respostas
                            </Typography>
                            <ItemsList
                                story={true}
                                icon={<UtterIcon />}
                                isSelected={this.isSelected}
                                content={this.props.content}
                                highlighted_text={this.state.value}
                                actionOnClick={this.props.addUtter}
                                items={this.filterItems(this.props.utters)}
                                selected_item_position={this.props.selected_item_position}
                            />
                        </Grid>
                    </Grid>
                    <Divider />
                    <div style={style.filter_items_container}>
                        <TextField
                            fullWidth
                            type="text"
                            label="Filtrar"
                            variant="outlined"
                            value={this.state.value}
                            InputProps={{ endAdornment: this.getFilterIcon() }}
                            onChange={(e) => this.handleFilterInput(e)}
                        />
                    </div>
                </Grid>


                <Grid item xs={8}>
                    <ToolbarName
                        story
                        is_enabled={this.isButtonEnabled()}
                        saveData={this.props.saveData}
                        deleteItem={this.props.deleteStory}
                        item={new Story(this.props.story_id, this.props.content, this.props.name)}
                    />
                    <div style={{
                        height: "calc(100vh - 74px - 72px)",
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                        {this.props.notification_text}
                        <Grid container item xs={12} direction="row">
                            <Grid
                                container
                                item xs={8}
                                justify="center"
                                alignItems="flex-start"
                                style={style.list}
                            >
                                <StoryList />
                            </Grid>
                            <Grid container item xs={4} >
                                
                                    <ExampleStory />
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
                <Snackbar
                    handleClose={() => this.props.notifyAction("")}
                    notification_text={this.props.notification_text}
                />
            </Grid>
        )
    }
}


const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
