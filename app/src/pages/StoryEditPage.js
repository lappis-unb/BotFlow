import React, { Component } from "react";
import { connect } from "react-redux";
import { getIntents, getUtters } from "../actions/storysAction";
import Grid from '@material-ui/core/Grid';
import ItemsList from "../components/ItemsList";

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
    }

    render() {        
        return (
            <Grid container>
                <Grid item xs={6} style={style.grid_item_list}>
                    <ItemsList
                        items={{ intents: this.props.intents, utters: this.props.utters}}
                        story
                        />
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => { return { ...state.storyReducer } };

const mapDispatchToProps = dispatch => ({
    getIntents: () => dispatch(getIntents()),
    getUtters: () => dispatch(getUtters()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryEditPage);
