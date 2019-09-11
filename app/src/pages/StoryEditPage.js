import React, { Component } from "react";
import { connect } from "react-redux";
import { getIntents, getUtters, saveData } from "../actions/storiesAction";
import Grid from '@material-ui/core/Grid';
import ItemsList from "../components/ItemsList";
import ToolbarName from '../components/ToolbarName'
import { selectItem } from "../actions/itemsAction";
import IntentIcon from '../icons/IntentIcon';
import UtterIcon from '../icons/UtterIcon';
import StoryList from '../components/StoryList';
import { Story } from '../utils/DataFormat.js'
import { STORIES_URL } from "../utils/url_routes";

const style = {
    grid_item_list: {
        background: "#dae8ea",
        paddingTop: '15px'
    }
}

class StoryEditPage extends Component {
    constructor(props) {
        super(props);
        this.props.getIntents()
        this.props.getUtters()
        this.state = {
            current_item: {
                "id": 1,
                "name": "stordsasadssica",
                "formatted_content": [
                    {
                        "id": 1,
                        "type": "intent",
                        "name": "lalal"
                    },
                    {
                        "id": 2,
                        "type": "utter",
                        "name": "lelele"
                    }
                ]
            }
        }
    }


    intentLabel = (name) => {
        return (
            <div style={{
                width: '242px',
                height: '48px',
                borderRadius: '4px',
                margin: '50px 100px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: 'solid 1px',
                borderColor: '#4b3953'
            }}>
                <IntentIcon />
                <div>Olá</div>
            </div >
        )
    }

    utterLabel = (name) => {
        return (
            <div style={{
                width: '242px',
                height: '48px',
                borderRadius: '4px',
                margin: '50px 100px',
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                border: 'solid 1px',
                borderColor: '#4b3953'
            }}>
                <UtterIcon />
                <div>Olá</div>
            </div >
        )
    }

    saveData() {
        let data = new Story(this.props.id_item, this.props.name_item, this.props.item_contents);
        console.log(STORIES_URL, data)
        this.props.saveData(STORIES_URL, data);
    }

    render() {
        console.log(this.props.utters, "props")
        return (
            <Grid container xs={12}>
                <Grid item xs={4} style={style.grid_item_list}>
                    <ItemsList
                        items={{ intents: this.props.intents, utters: this.props.utters }}
                        story
                    />
                </Grid>
                <Grid item xs={8}>
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
    selectItem: (item) => dispatch(selectItem(item)),
    saveData: (url, item) => dispatch(saveData(url, item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
