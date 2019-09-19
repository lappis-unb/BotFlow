import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Intent } from '../utils/DataFormat'
import { Creators as IntentAction } from '../ducks/intents';

import { style } from '../styles/style';
import { Add } from '../styles/button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import IntentIcon from '../icons/IntentIcon';
import Button from '@material-ui/core/Button';
import Snackbar from '../components/Snackbar';
import ListFilter from '../components/ListFilter';
import IntentForm from "../components/IntentForm";
import ToolbarName from '../components/ToolbarName'
import SnackbarDelete from '../components/DeleteSnackbar';


class IntentPage extends Component {

  constructor(props) {
    super(props);
    this.props.getIntents();
    this.props.createNewIntent();
    this.state = {
      undo_delete: false
    }
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }


  handleSnackbarClick(value) {
    if (value === false) {
      this.props.deleteIntent(this.props.id)
    }
    value = (value === undefined ? false : value);
    this.setState({ undo_delete: value });
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

  isButtonEnabled() {
    const intent_contents = this.props.intent_contents;
    const old_item_content = this.props.old_intent_contents;
    const no_empty_fields = this.checkEmptyFieldsIntent(intent_contents);

    const name_changed = (this.props.name_intent !== this.props.old_name_intent);
    const contents_changed = JSON.stringify(intent_contents) !== JSON.stringify(old_item_content);
    const have_changes = (contents_changed || name_changed);

    const no_errors = (this.props.helper_text !== undefined ? this.props.helper_text.length === 0 : true);
    const no_empty_name = this.props.name_intent.length !== 0;

    return (
      no_errors &&
      have_changes &&
      no_empty_name &&
      no_empty_fields
    );
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          <div style={style.create_button}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.props.createNewIntent()}
            >
              <Add />{"Criar pergunta"}
            </Button>
          </div>
          <ListFilter
            icon={<IntentIcon />}
            items={this.props.intents}
            text="Perguntas cadastradas"
            actionOnClick={this.props.selectIntent}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            name_label="Nome da pergunta"
            item_id={this.props.id}
            items={this.props.intents}
            saveData={this.props.saveData}
            deleteItem={() => this.handleSnackbarClick(true)}
            name={this.props.name_intent}
            setItemName={this.props.setIntentName}
            actionClick={this.handleClick}
            helper_text={this.props.helper_text}
            is_enabled={this.isButtonEnabled()}
            item={
              new Intent(
                this.props.id,
                this.props.name_intent,
                this.props.intent_contents
              )
            }
          />

          <Divider />

          <div style={style.item_form}>
            <IntentForm />
          </div>

          <Snackbar
            handleClose={() => this.props.notifyAction("")}
            notification_text={this.props.notification_text}
          />

          <SnackbarDelete
            handleSnackbarClick={this.handleSnackbarClick}
            handleUndo={() => this.handleSnackbarClick}
            undo={this.state.undo_delete}
          />
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = state => { return { ...state.intent } };

const mapDispatchToProps = dispatch => bindActionCreators(IntentAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
