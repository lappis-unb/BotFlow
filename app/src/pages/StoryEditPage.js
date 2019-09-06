import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, createNewItem } from "../actions/itemsAction";
import { Intent } from '../utils/DataFormat'
import Grid from '@material-ui/core/Grid';
import IntentIcon from '../icons/IntentIcon';

import { INTENT_URL } from '../utils/url_routes.js'
import ItemsList from "../components/ItemsList";

const style = {
    grid_item_list: {
        background: "#dae8ea"
    }
}

class StoryEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
        this.props.getItems(INTENT_URL);
        this.props.createNewItem(new Intent());
    }

    setDataFormat(id = undefined, name = "", content = [""]) {
        return new Intent(id, name, content)
    }

    render() {
        return (
            <Grid container>
                <Grid item xs={6} style={style.grid_item_list}>
                    <ItemsList
                        icon={<IntentIcon />}
                        items={{ intents: this.props.items, utters: [{ name: 'a' }, { name: 'b' }]}}
                        text={"e ae?"}
                        selected_item_position={0}
                        story
                        />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => { return { ...state.intentReducer } };

const mapDispatchToProps = dispatch => ({
    getItems: (url) => dispatch(getItems(url)),
    createNewItem: (new_item) => dispatch(createNewItem(new_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
