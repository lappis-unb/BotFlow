import React, { Component } from "react";
import UttersList from "../components/UttersList";
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

  render() {
    return (
      <div>
        <Grid container>
          <Grid item xs={2}>
            <UttersList />
          </Grid>
          <Grid item xs={10}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  <Button disabled={!this.props.utter_button} variant="contained" size="small" onClick={() => this.props.saveData(this.props.current_utter, this.props.utters)}>
                    <SaveIcon />
                    Save
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

const mapStateToProps = state => ({
  text: state.text,
  utters: state.utters,
  current_utter: state.current_utter,
  utter_button: state.utter_submit_button_enable
});

const mapDispatchToProps = dispatch => ({
  createUtter: (new_utter) => dispatch(utterAction.createUtter(new_utter)),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  updateUtter: (new_utter, id) => dispatch(utterAction.updateUtter(new_utter, id)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
