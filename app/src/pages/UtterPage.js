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
import * as utterAction from "../actions/uttersAction";
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

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getUtters();
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
    const NAME_LABEL = "Nome da resposta";
    const OLD_ITEM = this.props.old_utter;
    const HELPER_TEXT = this.props.helper_text;
    const CREATE_BUTTON_TEXT = "Criar Resposta";
    const CURRENT_ITEM = this.props.current_utter;
    const ITEM_LIST_TEXT = "Respostas cadastradas";

    const ITEM_NAME = (this.props.current_item !== undefined) ? this.props.current_item.nameUtter : "";



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
          <ToolbarName
            current_item={CURRENT_ITEM}
            items={ITEMS}
            old_item={OLD_ITEM}
            name_label={NAME_LABEL}
            helper_text={HELPER_TEXT}
          />

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
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
