import { connect } from "react-redux";
import ItemPage from "../pages/ItemPage"
import React, { Component } from "react";
import * as utterAction from "../actions/uttersAction";

class IntentPage extends Component {
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
        mode="intent"
        items={this.props.utters}
        name_label="Nome da pergunta"
        button_text="Criar nova pergunta"
        old_item={this.props.old_utter}
        helper_text={this.props.helper_text}
        item_list_text="Perguntas cadastradas"
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

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
