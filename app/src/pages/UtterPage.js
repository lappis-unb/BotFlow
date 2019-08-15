import React, { Component } from "react";
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import Grid from '@material-ui/core/Grid';

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.props.getUtters();
  }

  render() {
    return (
      <div>
        <Grid container xs={12}>
          <Grid item xs={3}>
            <center>
              <Button variant="contained" color="primary" onClick={() => this.props.createNewUtter()}>
                + Criar Resposta
              </Button>
            </center>
            <ItemsList items={this.props.utters} text="Respostas cadastradas" />
          </Grid>
          <Grid item xs={9}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  <Button disabled={!this.props.utter_submit_button_enable} variant="contained" size="small" onClick={() => this.props.saveData(this.props.current_utter, this.props.utters)}>
                    <SaveIcon />
                    Gravar
                  </Button>
                  <button onClick={() => this.props.removeUtter(this.props.current_utter._id)}>Deletar utter</button>
                  {this.props.text}
                </Typography>
              </Toolbar>
            </AppBar>
            <UtterForm />
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => { return { ...state } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  createUtter: (new_utter) => dispatch(utterAction.createUtter(new_utter)),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  updateUtter: (new_utter, id) => dispatch(utterAction.updateUtter(new_utter, id)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
