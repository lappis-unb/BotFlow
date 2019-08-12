import React, { Component } from "react";
import UttersList from "../components/UttersList";
import UtterForm from "../components/UtterForm";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

class UtterPage extends Component {
  saveData() {
    if (this.props.current_utter._id !== undefined) {
      return this.props.updateUtter(this.props.current_utter, this.props.current_utter._id);
    }

    return this.props.createUtter(this.props.current_utter);
  }
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
                  <button onClick={() => this.saveData()}>Salvar</button>
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
  current_utter: state.current_utter
});

const mapDispatchToProps = dispatch => ({
  createUtter: (new_utter) => dispatch(utterAction.createUtter(new_utter)),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  updateUtter: (new_utter, id) => dispatch(utterAction.updateUtter(new_utter, id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
