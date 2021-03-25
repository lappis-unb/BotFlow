import { connect } from 'react-redux';
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux';
import { Add } from '../styles/button';
import UtterIcon from '../icons/UtterIcon';
import UtterForm from '../components/UtterForm';
import { isButtonEnabled } from '../utils/utils';
import ListFilter from '../components/ListFilter';
import ToolbarName from '../components/ToolbarName';
import DeletionConfirmationDialog from '../components/DeletionConfirmationDialog';

import { style } from '../styles/style';
import { Utter } from '../utils/DataFormat';
import Snackbar from '../components/Snackbar';
import { Creators as UtterAction } from '../ducks/utters';
import { message } from '../utils/messages';

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.props.getUtters();
    const id = this.props.history.location.pathname.split('/').pop();
    if (!isNaN(id)) { this.props.selectUtter(id); }

    this.state = {
      dialog_status: false,
    };

    this.selectUtter = this.selectUtter.bind(this);
    this.deleteUtter = this.deleteUtter.bind(this);
    this.changeStatusDialog = this.changeStatusDialog.bind(this);
  }

  changeStatusDialog(value) {
    this.setState({ dialog_status: value });
  }

  deleteUtter() {
    this.props.deleteUtter(this.props.id);
    this.setState({ dialog_status: false });
  }

  handleClose() {
    this.props.notifyAction('');
  }

  handleSnackbarClick(value) {
    if (value === false) {
      this.props.deleteUtter(this.props.id);
    }
    value = (value === undefined ? false : value);
    this.setState({ undo_delete: value });
  }

  checkEmptyFieldsUtter(alternatives) {
    let changed = true;
    if (alternatives !== undefined) {
      alternatives.forEach((alternative) => {
        alternative.forEach((text) => {
          if (text.trim().length === 0) {
            changed = false;
          }
        });
      });
    }
    return changed;
  }

  isButtonEnabled() {
    const no_empty_fields = this.checkEmptyFieldsUtter(this.props.content);

    return isButtonEnabled(
      this.props.content,
      this.props.old_content,
      this.props.name,
      this.props.old_name,
      this.props.helper_text,
      no_empty_fields,
    );
  }

  selectUtter(data, utter_position) {
    this.props.history.push(`/utters/${data.id}`);
    this.props.selectUtter(data.id, utter_position);
  }

  createUtter() {
    this.props.createNewUtter();
    this.props.history.push('/utters/new');
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3} style={style.grid_item_list}>
          <div style={style.create_button}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => this.createUtter()}
            >
              <Add />
              {message.utter.create_button}
            </Button>
          </div>
          <ListFilter
            icon={<UtterIcon />}
            items={this.props.utters}
            text={message.utter.list_filter}
            actionOnClick={this.selectUtter}
            selected_item_position={this.props.selected_item_position}
          />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            name_label={message.utter.toolbar_name}
            item_id={this.props.id}
            items={this.props.utters}
            saveData={this.props.saveData}
            deleteItem={() => this.changeStatusDialog(true)}
            name={this.props.name}
            placeholder={message.utter.placeholder}
            name_good_pratice={message.utter.name_good_pratice}
            setItemName={this.props.setUtterName}
            actionClick={this.handleClick}
            helper_text={this.props.helper_text}
            is_enabled={this.isButtonEnabled()}
            item={
              new Utter(
                this.props.id,
                this.props.name,
                this.props.multiple_alternatives,
                this.props.content,
              )
            }
          />
          <Divider />
          <div style={style.item_form}>
            <UtterForm />
          </div>

          <Snackbar
            handleClose={() => this.props.notifyAction('')}
            notification_text={this.props.notification_text}
          />

          <DeletionConfirmationDialog
            handleClose={() => this.changeStatusDialog(false)}
            deleteItem={this.deleteUtter}
            dialog_status={this.state.dialog_status}
          />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => ({ ...state.utter });

const mapDispatchToProps = (dispatch) => bindActionCreators(UtterAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
