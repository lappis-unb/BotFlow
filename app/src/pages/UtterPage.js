import { connect } from "react-redux";
import React, { Component } from "react";
import * as utterAction from "../actions/uttersAction";

import ItemPage from "../pages/ItemPage"

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getUtters();
  }

  render() {
    return (
      <ItemPage
        mode="utter"
        items={this.props.utters}
        name_label="Nome da resposta"
        button_text="Criar nova resposta"
        old_item={this.props.old_utter}
        helper_text={this.props.helper_text}
        item_list_text="Respostas cadastradas"
        current_item={this.props.current_utter}
        notification_text={this.props.notification_text}
        selected_item_position={this.props.selected_item_position}
      />
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters())
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
