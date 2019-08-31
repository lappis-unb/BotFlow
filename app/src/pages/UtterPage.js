import { connect } from "react-redux";
import React, { Component } from "react";
import { getItems } from "../actions/itemsAction";

import ItemPage from "../pages/ItemPage"
import { Utter } from '../utils/DataFormat'


const BASE = "http://localhost:3000/";
//const BASE = "https://botflow.api.lappis.rocks/";
const UTTER_URL = BASE + "utters/";

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    }
    this.props.getItems(UTTER_URL);
  }

  render() {
    return (
      <ItemPage
        mode="Utter"
        url={UTTER_URL}
        new_item={new Utter()}
        items={this.props.items}
        name_label="Nome da resposta"
        old_item={this.props.old_item}
        button_text="Criar nova resposta"
        helper_text={this.props.helper_text}
        item_list_text="Respostas cadastradas"
        current_item={this.props.current_item}
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