import { connect } from "react-redux";
import React, { Component } from "react";
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import MessageIcon from '@material-ui/icons/Message';
import * as utterAction from "../actions/uttersAction";
import { SaveButtonCheck, Done, Add, CreateNewUtter } from '../styles/button';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Divider } from "@material-ui/core";
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import SnackbarContent from "../components/CustomSnackbar"


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


class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getUtters();
  }

  checkEmptyFields() {
    let no_empty_fields = true;
    if (this.props.current_utter.utters !== undefined) {
      this.props.current_utter.utters.forEach(utter => {
        utter.utterText.forEach(text => {
          if ((text.text).trim().length === 0) {
            no_empty_fields = false;
          }
        })
      });
    }
    return no_empty_fields;
  }

  checkRepeatedName(items, item_name) {
    return items.find((item) => (
      (item.nameUtter === item_name) &&
      (item._id !== this.props.old_utter._id)
    ));
  }

  checkIsValidName(items, item_name) {
    let helper_text = "";
    let regex = /^[\w\d_]+$/;

    if (!regex.test(item_name) && item_name.length > 0) {
      helper_text = "Use apenas letras sem acentos, números ou '_'";
      item_name = item_name.substr(0, item_name.length - 1);
    } else if (this.checkRepeatedName(items, item_name) !== undefined) {
      helper_text = "Por favor, insira um nome não repetido."
    }

    this.props.setHelperText(helper_text);
    this.props.setUtterName(item_name, items);
  }

  isEnableUtterButton(current_item, old_item) {
    const no_empty_fields = this.checkEmptyFields();
    const have_changes = JSON.stringify(current_item) !== JSON.stringify(old_item);
    const no_errors = this.props.helper_text === '';
    const no_empty_name = (
      (current_item.nameUtter !== undefined) &&
      ((current_item.nameUtter).length !== 0)
    );

    console.log("============================")
    console.log("have_changes", have_changes);
    console.log("no_empty_fields", no_empty_fields);
    console.log("no_errors", no_errors);
    console.log("no_empty_name", no_empty_name);
    console.log("============================")

    return (
      have_changes &&
      no_empty_fields &&
      no_errors &&
      no_empty_name
    );
  }

  getAppBar() {
    const utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";
    const name_item_label = "Nome da resposta";

    return (
      <Toolbar style={style.toolbar}>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <TextField
            fullWidth
            error={this.props.helper_text !== ""}
            type="text"
            id={name_item_label}
            value={utter_name}
            label={name_item_label}
            helperText={this.props.helper_text}
            onChange={(e) => this.checkIsValidName(this.props.utters, e.target.value)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disabled={!this.isEnableUtterButton(this.props.current_utter, this.props.old_utter)}
              onClick={() => this.handleClick(false)}>
              <SaveButtonCheck>
                <Done />
                <label>
                  Gravar
                </label>
              </SaveButtonCheck>
            </Button>
            <Button onClick={() => this.handleClick(true)}>DELETAR</Button>
          </Typography>
        </Grid>
      </Toolbar>
    )
  }

  handleClick(remove) {
    if (remove) {
      this.props.removeUtter(this.props.current_utter)
    } else {
      this.props.saveData(this.props.current_utter, this.props.utters)
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
        onClick={() => this.props.createNewUtter()}>
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

  render() {
    const ITEMS = this.props.utters;
    const CREATE_BUTTON_TEXT = "Criar Resposta";
    const ITEM_LIST_TEXT = "Respostas cadastradas";

    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          {this.getCreateButton(CREATE_BUTTON_TEXT)}

          <ItemsList
            icon={<MessageIcon />}
            items={ITEMS}
            text={ITEM_LIST_TEXT}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          {this.getAppBar()}

          <Divider />

          <div style={style.item_form}>
            <UtterForm />
          </div>

          {this.getSnackbar(this.props.notification_text)}
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  notifyAction: (text) => dispatch(utterAction.notifyAction(text)),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  setUtterName: (utter_name) => dispatch(utterAction.setUtterName(utter_name)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters)),
  setHelperText: (helper_text) => dispatch(utterAction.setHelperText(helper_text))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
