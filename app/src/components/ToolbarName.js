import NameField from './NameField.js'
import { Done } from '../styles/button';
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

const style = {
    toolbar: {
        background: "#f6f9f9",
        padding: "4px"
    },
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
                            onClick={() => this.handleDelete()}
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

    handleClick() {
        this.props.saveData(this.props.item);
    }

    handleDelete() {
        this.props.deleteItem(this.props.item.id);
        this.setState({ open: false });
    }

    getDeleteOption() {
        if (this.props.item.id !== '') {
            return (
                <IconButton
                    aria-label="more"
                    aria-haspopup="true"
                    aria-controls="long-menu"
                    onClick={e => this.handleMenuClick(e, true)}
                >
                    <MoreVertIcon />
                </IconButton>
            )
        }
    }

    render() {
        return (
            <Toolbar style={style.toolbar}>
                <Grid item xs={2} />
                <Grid item xs={4}>
                    {this.props.story ? null : (
                        <NameField
                            name={this.props.name}
                            items={this.props.items}
                            item_id={this.props.item.id}
                            label={this.props.name_label}
                            placeholder={this.props.placeholder}
                            setItemName={this.props.setItemName}
                            helper_text={this.props.helper_text !== undefined ? this.props.helper_text : ''}
                        />
                    )}
                </Grid>
                <Grid item xs={1}>
                {this.props.story ? null : (
                    <Tooltip title={<h2>{this.props.name_good_pratice}</h2>}>
                        <IconButton aria-label="delete">
                            <InfoIcon />
                        </IconButton>
                    </Tooltip>
                )}
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={3}>
                    <Button
                        color="secondary"
                        variant="contained"
                        disabled={!this.props.is_enabled}
                        onClick={() => this.handleClick()}
                    >
                        <Done />Gravar
                    </Button>

                    {this.getDeleteOption()}
                    {this.getMoreOptions()}
                </Grid>
            </Toolbar>
        )
    }
}
