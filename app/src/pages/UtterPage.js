import React, { Component } from "react";
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";
import MessageIcon from '@material-ui/icons/Message';
import { SaveButtonCheck, Done, Add, CreateNewUtter } from '../styles/button';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import { Divider } from "@material-ui/core";

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.props.getUtters();
  }

  isEnableUtterButton() {
    let has_empty_fields = false;
    const no_modifications = (JSON.stringify(this.props.current_utter) !== JSON.stringify(this.props.old_utter));

    this.props.current_utter.utters.forEach(utter => {
      utter.utterText.forEach(text => {
        if ((text.text).trim().length === 0) {
          has_empty_fields = true;
        }
      })
    });

    return (
      no_modifications &&
      !has_empty_fields &&
      (this.props.current_utter.nameUtter.length !== 0)
    );
  }

  getAppBar() {
    let utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";

    return (
      <Toolbar style={{ background: "#f6f9f9", padding: "4px" }}>
        <Grid item xs={1} />
        <Grid item xs={7}>
          <TextField
            fullWidth
            type="text"
            id="utter-name"
            value={utter_name}
            label="Nome da resposta"
            helperText={this.props.helper_text}
            onChange={(e) => this.props.setUtterName(e.target.value, this.props.utters)}
          />
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={3}>
          <Typography variant="h6" color="inherit">
            <Button
              disabled={!this.isEnableUtterButton()}
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => this.props.saveData(this.props.current_utter, this.props.utters)}>
              <SaveButtonCheck>
                <Done />
                <label>
                  Gravar
                </label>
              </SaveButtonCheck>
            </Button>
            <Button onClick={() => this.props.removeUtter(this.props.current_utter._id)}>DELETAR</Button>
            {this.props.text}
          </Typography>
        </Grid>
      </Toolbar>
    )
  }

  render() {
    return (
      <Grid container>
        <Grid item xs={3} style={{ background: "#dae8ea" }}>
          <Button
            color="secondary"
            variant="contained"
            style={{ margin: "16px 24px" }}
            onClick={() => this.props.createNewUtter()}
          >
            <CreateNewUtter>
              <Add />
              <label>Criar Resposta</label>
            </CreateNewUtter>
          </Button>
          <ItemsList items={this.props.utters} icon={<MessageIcon />} text="Respostas cadastradas" />
        </Grid>
        <Grid item xs={9}>
          {this.getAppBar()}
          <Divider />
          <div style={{ height: "calc(100vh - 164px)", overflowY: "auto", overflowX: "hidden" }}>
            <UtterForm />
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  setUtterName: (utter_name) => dispatch(utterAction.setUtterName(utter_name)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);