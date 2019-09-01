import { connect } from "react-redux";
import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
    saveData,
    setNameItem,
    deleteItem
} from "../actions/itemsAction";

import { SaveButtonCheck, Done } from '../styles/button';

const style = {
    toolbar: {
        background: "#f6f9f9",
        padding: "4px"
    },
    grid_item_list: {
        background: "#dae8ea"
    },
    create_button: {
        margin: "16px 24px"
    },
    item_form: {
        height: "calc(100vh - 164px)",
        overflowY: "auto",
        overflowX: "hidden"
    }
}


class ToolbarName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helper_text: ""
        }
    }

    checkEmptyFields(items) {
        let no_empty_fields = true;
        if (items.alternatives !== undefined) {
            items.alternatives.forEach(alternative => {
                alternative.contents.forEach(text => {
                    if ((text.text).trim().length === 0) {
                        no_empty_fields = false;
                    }
                })
            });
        }
        return no_empty_fields;
    }

    checkRepeatedName(items, item_name, old_id) {
        return items.find((item) => (
            (item.name === item_name) && (item.id !== old_id)
        ));
    }

    checkIsValidName(items, item_name, old_id) {

        let helper_text = "";
        let regex = /^[\w\d_]+$/;

        if (!regex.test(item_name) && item_name.length > 0) {
            helper_text = "Use apenas letras sem acentos, números ou '_'";
            item_name = item_name.substr(0, item_name.length - 1);
        } else if (this.checkRepeatedName(items, item_name, old_id) !== undefined) {
            helper_text = "Por favor, insira um nome não repetido."
        }

        this.setState({ helper_text: helper_text });
        this.props.setNameItem(item_name)
    }

    isButtonEnabled(current_item, old_item) {
        const no_errors = this.state.helper_text === '';
        const no_empty_fields = this.checkEmptyFields(current_item);
        const name_changed = this.props.item_name !== old_item.name;
        const contents_changed = JSON.stringify(current_item) !== JSON.stringify(old_item);
        const have_changes = (contents_changed || name_changed);
        const no_empty_name = (
            (this.props.item_name !== undefined) &&
            (this.props.item_name).length !== 0
        );


        //console.log("============================")
        //console.log("have_changes", have_changes);
        //console.log("contents", contents_changed );
        //console.log("name", name_changed );
        //console.log("no_empty_fields", no_empty_fields);
        //console.log("no_errors", no_errors);
        //console.log("no_empty_name", no_empty_name);
        //console.log("============================")

        return (
            have_changes &&
            no_empty_fields &&
            no_errors &&
            no_empty_name
        );
    }

    handleClick(remove) {
        if (remove) {
            this.props.deleteItem(
                this.props.url,
                this.props.current_item.id,
                this.props.mode,
                this.props.new_item
            )
        } else {
            this.props.saveData(
                this.props.url,
                this.props.mode,
                this.props.current_item
            )
        }
    }

    render() {
        const ITEMS = this.props.items;
        const OLD_ITEM = this.props.old_item;
        const NAME_ITEM_LABEL = "Nome da resposta";
        const CURRENT_ITEM = this.props.current_item;

        return (
            <Toolbar style={style.toolbar}>
                <Grid item xs={1} />
                <Grid item xs={7}>
                    <TextField
                        fullWidth
                        error={this.state.helper_text !== ""}
                        type="text"
                        id={NAME_ITEM_LABEL}
                        value={this.props.item_name}
                        label={NAME_ITEM_LABEL}
                        helperText={this.state.helper_text}
                        onChange={(e) => this.checkIsValidName(ITEMS, e.target.value, OLD_ITEM.id)}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <Typography variant="h6" color="inherit">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            disabled={!this.isButtonEnabled(CURRENT_ITEM, OLD_ITEM)}
                            onClick={() => this.handleClick(false)}>
                            <SaveButtonCheck>
                                <Done />
                                <label>Gravar</label>
                            </SaveButtonCheck>
                        </Button>
                        <Button onClick={() => this.handleClick(true)}>DELETAR</Button>
                    </Typography>
                </Grid>
            </Toolbar>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setNameItem: (item_name) => dispatch(setNameItem(item_name)),
    saveData: (url, mode, item) => (dispatch(saveData(url, mode, item))),
    deleteItem: (url, delete_item_id, mode, item) => dispatch(deleteItem(url, delete_item_id, mode, item))
});

export default connect(null, mapDispatchToProps)(ToolbarName);
