import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Divider } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ListFilter from "../components/ListFilter";
import UtterForm from "../components/UtterForm";
import IntentForm from "../components/IntentForm";
import Snackbar from '@material-ui/core/Snackbar';
import ToolbarName from '../components/ToolbarName'
import { createNewItem, notifyAction } from "../actions/itemsAction";
import { Add } from '../styles/button';
import SnackbarContent from "../components/CustomSnackbar"
import { selectItem } from "../actions/itemsAction";


const style = {
  grid_item_list: {
    background: "#dae8ea"
  },
  item_form: {
    height: "calc(100vh - 164px)",
    overflowY: "auto",
    overflowX: "hidden"
  },
  create_button: { margin: "16px 24px" }
}

class ItemPage extends Component {

  handleClose() {
    this.props.notifyAction("");
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
    return (this.props.mode === "Utter") ? <UtterForm new_utter={this.props.new_item} /> : <IntentForm new_utter={this.props.new_item} />;
  }


  checkEmptyFieldsIntent(samples) {
    let changed = true;
    if (samples !== undefined) {
      samples.forEach(sample => {
        if (sample.trim().length === 0) {
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
        alternative.forEach(text => {
          if (text.trim().length === 0) {
            changed = false;
          }
        })
      });
    }
    return changed;
  }

  isButtonEnabled(item_contents, old_item_content) {
    let no_empty_fields = true;

    if (this.props.mode === "Utter") {
      no_empty_fields = this.checkEmptyFieldsUtter(item_contents);
    } else {
      no_empty_fields = this.checkEmptyFieldsIntent(item_contents);
    }

    const name_changed = (this.props.name_item !== this.props.old_name_item);
    const contents_changed = JSON.stringify(item_contents) !== JSON.stringify(old_item_content);
    const have_changes = (contents_changed || name_changed);

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
      no_empty_fields
    );
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
                this.props.multiple_alternatives,
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
    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          <Button
            color="primary"
            variant="contained"
            style={style.create_button}
            onClick={() => this.props.createNewItem(this.props.new_item)}
          >
            <Add />{this.props.button_text}
          </Button>

          <ListFilter
            icon={this.props.icon}
            items={this.props.items}
            text={this.props.item_list_text}
            actionOnClick={this.props.selectItem}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            is_enabled={false}
            items={this.props.items}
            saveData={this.saveData}
            remove_action={this.delete}
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
  notifyAction: (text) => dispatch(notifyAction(text)),
  selectItem: (url, item_id, index) => dispatch(selectItem(url, item_id, index))
});

export default connect(null, mapDispatchToProps)(ItemPage);
