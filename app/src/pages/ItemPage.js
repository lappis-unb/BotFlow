import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Divider } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import Snackbar from '@material-ui/core/Snackbar';
import ToolbarName from '../components/ToolbarName'
import MessageIcon from '@material-ui/icons/Message';
import { createNewItem, notifyAction } from "../actions/itemsAction";
import { Add, CreateNewUtter } from '../styles/button';
import SnackbarContent from "../components/CustomSnackbar"

const style = {
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

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
  }

  handleClose() {
    this.props.notifyAction("");
  }

  getCreateButton(text) {
    return (
      <Button
        color="secondary"
        variant="contained"
        style={style.create_button}
        onClick={() => this.props.createNewItem(this.props.new_item)}>
        <CreateNewUtter>
          <Add />
          <label>{text}</label>
        </CreateNewUtter>
      </Button>
    )
  }

  getSnackbar(notification_text) {
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        open={notification_text !== ''}
        onClose={() => this.handleClose()}>
        <SnackbarContent
          variant="success"
          message={notification_text}
          onClose={() => this.handleClose()}
        />
      </Snackbar>
    )
  }

  getForm() {
    return (this.props.mode === "Utter") ? <UtterForm new_utter={this.props.new_item} /> : "Outro form";
  }

  render() {
    const OLD_ITEM = this.props.old_item;
    const CURRENT_ITEM = this.props.current_item;

    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          {this.getCreateButton(this.props.button_text)}

          <ItemsList
            icon={<MessageIcon />}
            items={this.props.items}
            text={this.props.item_list_text}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            old_item={OLD_ITEM}
            url={this.props.url}
            mode={this.props.mode}
            items={this.props.items}
            current_item={CURRENT_ITEM}
            new_item={this.props.new_item}
            name_label={this.props.name_label}
            helper_text={this.props.helper_text}
          />

          <Divider />

          <div style={style.item_form}>
            {this.getForm()}
          </div>

          {this.getSnackbar(this.props.notification_text)}
        </Grid>
      </Grid >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  createNewItem: (new_item) => dispatch(createNewItem(new_item)),
  notifyAction: (text) => dispatch(notifyAction(text))
});

export default connect(null, mapDispatchToProps)(ItemPage);
