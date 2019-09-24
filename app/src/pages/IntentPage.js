import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Intent } from '../utils/DataFormat'
import { Creators as IntentAction } from '../ducks/intents';

import { style } from '../styles/style';
import { Add } from '../styles/button';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import { message } from '../utils/messages';
import IntentIcon from '../icons/IntentIcon';
import Button from '@material-ui/core/Button';
import Snackbar from '../components/Snackbar';
import ListFilter from '../components/ListFilter';
import IntentForm from "../components/IntentForm";
import ToolbarName from '../components/ToolbarName'
import { isButtonEnabled } from '../utils/utils';
import DeletionConfirmationDialog from '../components/DeletionConfirmationDialog';


class IntentPage extends Component {

  constructor(props) {
    super(props);
    this.props.getIntents();
    const id = this.props.history.location.pathname.split('/').pop();
    //isNaN(id) ? this.props.createNewIntent() : this.props.selectIntent(id);
    if (isNaN(id)) this.props.selectIntent(id);

    this.state = {
      dialog_status: false
    }

    this.selectIntent = this.selectIntent.bind(this)
    this.deleteIntent = this.deleteIntent.bind(this)
    this.changeStatusDialog = this.changeStatusDialog.bind(this)
  }

  changeStatusDialog(value) {
    this.setState({ dialog_status: value });
  }

  deleteIntent() {
    this.props.deleteIntent(this.props.id)
    this.setState({ dialog_status: false });
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
    const no_empty_fields = this.checkEmptyFieldsIntent(this.props.content);

    return isButtonEnabled(
      this.props.content,
      this.props.old_content,
      this.props.name,
      this.props.old_name,
      this.props.helper_text,
      no_empty_fields
    );
  }

  selectIntent(data, intent_position) {
    this.props.history.push('/intents/' + data.id);
    this.props.selectIntent(data.id, intent_position);
  }

  createIntent() {
    this.props.createNewIntent();
    this.props.history.push('/intents/new');
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          <div style={style.create_button}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.createIntent()}
            >
              <Add />{message.intent.create_button}
            </Button>
          </div>
          <ListFilter
            icon={<IntentIcon />}
            items={this.props.intents}
            text={message.intent.list_filter}
            actionOnClick={this.selectIntent}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            name_label={message.intent.toolbar_name}
            item_id={this.props.id}
            items={this.props.intents}
            saveData={this.props.saveData}
            deleteItem={() => this.changeStatusDialog(true)}
            name={this.props.name}
            setItemName={this.props.setIntentName}
            actionClick={this.handleClick}
            helper_text={this.props.helper_text}
            is_enabled={this.isButtonEnabled()}
            item={
              new Intent(
                this.props.id,
                this.props.name,
                this.props.content
              )
            }
          />

          <Divider />

          <div style={style.item_form}>
            <IntentForm />
          </div>

          <Snackbar
            handleClose={() => this.props.notifyAction('')}
            notification_text={this.props.notification_text}
          />

          <DeletionConfirmationDialog
            handleClose={() => this.changeStatusDialog(false)}
            deleteItem={this.deleteIntent}
            dialog_status={this.state.dialog_status}
          />
        </Grid>
      </Grid >
    )
  }
}

const mapStateToProps = state => { return { ...state.intent } };

const mapDispatchToProps = dispatch => bindActionCreators(IntentAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
