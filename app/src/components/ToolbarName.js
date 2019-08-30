import { connect } from "react-redux";
import React, { Component } from "react";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
    saveData,
    setItemName,
    deleteItem,
    setHelperText
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
    // TODO update json format
    checkEmptyFields(items) {
        let no_empty_fields = true;
        if (items.utters !== undefined) {
            items.utters.forEach(utter => {
                utter.utterText.forEach(text => {
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
            (item.nameUtter === item_name) && (item._id !== old_id)
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

        this.props.setHelperText(helper_text);
        this.props.setItemName(item_name, items);
    }

    isButtonEnabled(current_item, old_item) {
        const no_errors = this.props.helper_text === '';
        const no_empty_fields = this.checkEmptyFields(current_item);
        const have_changes = JSON.stringify(current_item) !== JSON.stringify(old_item);

        // TODO update json format
        const no_empty_name = (
            (current_item.nameUtter !== undefined) &&
            ((current_item.nameUtter).length !== 0)
        );

        //console.log("============================")
        //console.log("have_changes", have_changes);
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
            const item = this.props.current_item;
            const delete_url = item ? this.props.delete_update_url + item._id : "";
            this.props.deleteItem(
                delete_url,
                this.props.create_get_url,
                this.props.mode,
                this.props.new_item
            )
        } else {
            this.props.saveData(
                this.props.current_item,
                this.props.items,
                this.props.create_get_url,
                this.props.delete_update_url,
                this.props.mode
            )
        }
    }

    // TODO update json format
    render() {
        const ITEMS = this.props.items;
        const OLD_ITEM = this.props.old_item;
        const NAME_ITEM_LABEL = "Nome da resposta";
        const HELPER_TEXT = this.props.helper_text;
        const CURRENT_ITEM = this.props.current_item;
        const ITEM_NAME = (this.props.current_item !== undefined) ? this.props.current_item.nameUtter : "";

        return (
            <Toolbar style={style.toolbar}>
                <Grid item xs={1} />
                <Grid item xs={7}>
                    <TextField
                        fullWidth
                        error={HELPER_TEXT !== ""}
                        type="text"
                        id={NAME_ITEM_LABEL}
                        value={ITEM_NAME}
                        label={NAME_ITEM_LABEL}
                        helperText={HELPER_TEXT}
                        onChange={(e) => this.checkIsValidName(ITEMS, e.target.value, OLD_ITEM._id)}
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
    deleteItem: (delete_url, get_url, mode, item) => dispatch(deleteItem(delete_url, get_url, mode, item)),
    setItemName: (item_name) => dispatch(setItemName(item_name)),
    setHelperText: (helper_text) => dispatch(setHelperText(helper_text)),
    saveData: (
        current_item,
        items,
        create_get_url,
        delete_update_url,
        mode
    ) => (
            dispatch(saveData(current_item, items, create_get_url, delete_update_url, mode))
        )
});

export default connect(null, mapDispatchToProps)(ToolbarName);
