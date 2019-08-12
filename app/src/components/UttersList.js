import React, { Component } from "react";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";

import Button from '@material-ui/core/Button';

class UttersList extends Component {
  componentWillMount() {
    this.props.getUtters();
  }

  uttersList() {
    if (this.props.filtered_utters !== undefined) {
      return this.props.filtered_utters.map((utter, index) => (
        <li key={"utters_list" + index}
          onClick={() => this.props.selectUtter(utter._id)}>
          {utter.nameUtter}
        </li>
      ));
    }
  }

  render() {
    return (
      <div>
        <center><Button variant="contained" onClick={() => this.props.createNewUtter()}>Criar uma nova utter</Button></center>
        <h8>Respostas cadastradas</h8>
        <ul>{this.uttersList()}</ul>
        <input value={this.props.filter_value} onChange={(e) => this.props.filterUtters(e.target.value)} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    utters: state.utters,
    filtered_utters: state.filtered_utters
  }
};

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  filterUtters: (value) => dispatch(utterAction.filterUtters(value)),
  selectUtter: (utters, utter_id) => dispatch(utterAction.selectUtter(utters, utter_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(UttersList);
