import { connect } from "react-redux";
import React, { Component } from "react";
import { getItems } from "../actions/itemsAction";

import ItemPage from "../pages/ItemPage"
import {
  Utter
} from '../utils/utter.js'


//const BASE = "http://localhost:3030/";
const BASE = "https://botflow.api.lappis.rocks/";
const UTTER_URL_API_CREATE_GET = BASE + "project/utter/";
const UTTER_URL_API_DELETE_UPDATE = BASE + "utter/";

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getItems(UTTER_URL_API_CREATE_GET);
  }

  render() {
    return (
      <ItemPage
        mode="Utter"
        new_item={new Utter()}
        items={this.props.items}
        name_label="Nome da resposta"
        old_item={this.props.old_utter}
        button_text="Criar nova resposta"
        helper_text={this.props.helper_text}
        item_list_text="Respostas cadastradas"
        current_item={this.props.current_utter}
        create_get_url={UTTER_URL_API_CREATE_GET}
        delete_update_url={UTTER_URL_API_DELETE_UPDATE}
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

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);