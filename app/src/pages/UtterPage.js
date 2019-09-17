import { connect } from "react-redux";
import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { Divider } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import ListFilter from "../components/ListFilter";
import { Add } from '../styles/button';
import UtterForm from "../components/UtterForm";
import UtterIcon from '../icons/UtterIcon';
import ToolbarName from '../components/ToolbarName';
import SnackbarDelete from '../components/DeleteSnackbar'

import { Utter } from "../utils/DataFormat";
import { bindActionCreators } from 'redux';
import { Creators as UtterAction } from '../ducks/utters';
import Snackbar from '../components/Snackbar';
import { style } from './style'

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.props.getUtters();
    this.props.createNewUtter();
    this.state = {
      undo_delete: false
    }
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
  }

  handleClose() {
    this.props.notifyAction('');
  }

  handleSnackbarClick(value) {
    if(value===false){
      this.props.deleteUtter(this.props.id)
    }
    value = (value===undefined ? false : value);
    this.setState({ undo_delete: value });
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

  isButtonEnabled() {
    const utter_contents = this.props.utter_contents;
    const old_item_content = this.props.old_utter_contents;

    const no_empty_fields = this.checkEmptyFieldsUtter(utter_contents);

    const name_changed = (this.props.name !== this.props.old_name);
    const contents_changed = JSON.stringify(utter_contents) !== JSON.stringify(old_item_content);
    const have_changes = (contents_changed || name_changed);

    const no_errors = this.props.helper_text.length === 0;
    const no_empty_name = this.props.name.length !== 0;

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
              onClick={() => this.props.createNewUtter()}
            >
              <Add />{"Criar resposta"}
            </Button>
          </div>
          <ListFilter
            icon={<UtterIcon />}
            items={this.props.utters}
            text="Respostas cadastradas"
            actionOnClick={this.props.selectUtter}
            selected_item_position={this.props.selected_item_position} />
        </Grid>

        <Grid item xs={9}>
          <ToolbarName
            name_label="Nome da resposta"
            item_id={this.props.id}
            items={this.props.utters}
            saveData={this.props.saveData}
            deleteItem={() => this.handleSnackbarClick(true)}
            name={this.props.name}
            setItemName={this.props.setUtterName}
            actionClick={this.handleClick}
            helper_text={this.props.helper_text}
            is_enabled={this.isButtonEnabled()}
            item={
              new Utter(
                this.props.id,
                this.props.name,
                this.props.multiple_alternatives,
                this.props.utter_contents
              )
            }
          />
          <Divider />
          <div style={style.item_form}>
            {this.state.undo_delete}
            <UtterForm />
          </div>

          <Snackbar
            handleClose={() => this.props.notifyAction('')}
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

const mapStateToProps = state => { return { ...state.utter } };

const mapDispatchToProps = dispatch => bindActionCreators(UtterAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
