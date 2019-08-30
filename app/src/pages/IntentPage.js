import { connect } from "react-redux";
import ItemPage from "../pages/ItemPage"
import React, { Component } from "react";
import { getItems } from "../actions/itemsAction";

const BASE = "https://botflow.api.lappis.rocks/";
//const BASE = "http://localhost:3030/";

//const INTENT_URL_API_GET_DELETE = BASE + "intent/";
const INTENT_URL_API_CREATE_UPDATE_GET = BASE + "project/intent/";


class IntentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getItems(INTENT_URL_API_CREATE_UPDATE_GET);
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
  getItems: (url) => dispatch(getItems(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(IntentPage);
