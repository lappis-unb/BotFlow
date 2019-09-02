import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
    saveData,
    deleteItem,
    setNameItem
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

const options = [
    'Deletar',
]

class ToolbarName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            helper_text: "",
            anchorEl: null,
            open: false,
        }
    }

    checkEmptyFieldsIntent(questions) {
        let changed = true;
        if (questions !== undefined) {
            questions.forEach(question => {
                if ((question.text).trim().length === 0) {
                    changed = false;
                }
            });
        }
        return changed;
    }

    checkEmptyFieldsUtter(alternatives) {
        let changed = true;
        if (alternatives !== undefined) {
            alternatives.forEach(alternative => {
                alternative.contents.forEach(text => {
                    if ((text.text).trim().length === 0) {
                        changed = false;
                    }
                })
            });
        }
        return changed;
    }

    checkRepeatedName(items, name_item) {
        return items.find((item) => (
            (item.name === name_item) &&
            (item.id !== this.props.id_item)
        ));
    }

    checkIsValidName(items, name_item) {
        let helper_text = "";
        let regex = /^[\w\d_]+$/;

        if (!regex.test(name_item) && name_item.length > 0) {
            helper_text = "Use apenas letras sem acentos, números ou '_'";
            name_item = name_item.substr(0, name_item.length - 1);
        } else if (this.checkRepeatedName(items, name_item) !== undefined) {
            helper_text = "Por favor, insira um nome não repetido."
        }

        this.setState({ helper_text: helper_text });
        this.props.setNameItem(name_item)
    }

    isButtonEnabled(item_contents, old_item_content) {
        const no_errors = this.state.helper_text === '';
        let no_empty_fields = true;

        if (this.props.mode === "Utter") {
            no_empty_fields = this.checkEmptyFieldsUtter(item_contents);
        } else {
            no_empty_fields = this.checkEmptyFieldsIntent(item_contents);
        }

        const name_changed = (this.props.name_item !== this.props.old_name_item);
        const contents_changed = JSON.stringify(item_contents) !== JSON.stringify(old_item_content);
        const have_changes = (contents_changed || name_changed);
        const no_empty_name = (
            (this.props.name_item !== undefined) &&
            (this.props.name_item).length !== 0
        );


        //console.log("============================")
        //console.log("have_changes", have_changes);
        //console.log("contents_changed", contents_changed );
        //console.log("name_changed", name_changed );
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

    handleMenuClick(event, is_open) {
        if (is_open) {
            this.setState({
                anchorEl: event.currentTarget,
                open: is_open
            });
        } else {
            this.setState({
                anchorEl: null,
                open: is_open
            });
        }
    }

    handleClick(remove) {
        if (remove) {
            this.props.deleteItem(
                this.props.url,
                this.props.id_item,
                this.props.mode,
                this.props.new_item
            )
            this.setState({ open: false });
        } else {
            let current_item = {}

            if (this.props.mode === "Utter") {
                current_item = this.props.setDataFormat(
                    this.props.id_item,
                    this.props.name_item,
                    this.props.have_alternatives,
                    this.props.item_contents
                );
            } else {
                current_item = this.props.setDataFormat(
                    this.props.id_item,
                    this.props.name_item,
                    this.props.item_contents
                );
            }

            this.props.saveData(
                this.props.url,
                this.props.mode,
                current_item
            )
        }
    }

    render() {
        const ITEMS = this.props.items;
        const NAME_ITEM_LABEL = "Nome da resposta";

        return (
            <Toolbar style={style.toolbar}>
                <Grid item xs={1} />
                <Grid item xs={7}>
                    <TextField
                        fullWidth
                        error={this.state.helper_text !== ""}
                        type="text"
                        id={NAME_ITEM_LABEL}
                        value={this.props.name_item}
                        label={NAME_ITEM_LABEL}
                        helperText={this.state.helper_text}
                        onChange={(e) => this.checkIsValidName(ITEMS, e.target.value)}
                    />
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={3}>
                    <Typography variant="h6" color="inherit">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            disabled={!this.isButtonEnabled(this.props.item_contents, this.props.old_item_contents)}
                            onClick={() => this.handleClick(false)}>
                            <SaveButtonCheck>
                                <Done />
                                <label>Gravar</label>
                            </SaveButtonCheck>
                        </Button>
                        <IconButton
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={e => this.handleMenuClick(e, true)}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={this.state.open}
                            onClose={e => this.handleMenuClick(e, false)}
                            PaperProps={{
                                style: {
                                    width: 150,
                                },
                            }}
                        >
                            {options.map(option => (
                                <MenuItem key={option} selected={option === 'Deletar'} onClick={() => this.handleClick(true)}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Menu>
                    </Typography>
                </Grid>
            </Toolbar>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    setNameItem: (name_item) => dispatch(setNameItem(name_item)),
    saveData: (url, mode, item) => dispatch(saveData(url, mode, item)),
    deleteItem: (url, delete_item_id, mode, item) => dispatch(deleteItem(url, delete_item_id, mode, item))
});

export default connect(null, mapDispatchToProps)(ToolbarName);
