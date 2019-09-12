import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import NameField from './NameField.js'
import { Done } from '../styles/button';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

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

const options = ['Apagar']

export default class ToolbarName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        }
    }

    getMoreOptions() {
        return (
            <Menu
                keepMounted
                id="long-menu"
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                PaperProps={{ style: { width: 150 } }}
                onClose={e => this.handleMenuClick(e, false)}
            >
                {
                    options.map(option => (
                        <MenuItem
                            key={option}
                            selected={option === 'Apagar'}
                            onClick={() => this.handleClick(true)}
                        >
                            {option}
                        </MenuItem>
                    ))
                }
            </Menu>
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

    handleClick(is_delete) {
        is_delete ? this.props.delete() : this.props.saveData();
    }

    render() {
        return (
            <Toolbar style={style.toolbar}>
                <Grid item xs={2} />
                <Grid item xs={5}>
                    <NameField
                        items={this.props.items}
                        name={this.props.item_name}
                        label={this.props.name_label}
                    />
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={3}>
                    <Button
                        color="secondary"
                        variant="contained"
                        disabled={!this.props.is_enabled}
                        onClick={() => this.handleClick(false)}
                    >
                        <Done />Gravar
                    </Button>

                    <IconButton
                        aria-label="more"
                        aria-haspopup="true"
                        aria-controls="long-menu"
                        onClick={e => this.handleMenuClick(e, true)}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    {this.getMoreOptions()}
                </Grid>
            </Toolbar>
        )
    }
}
