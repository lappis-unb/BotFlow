import { connect } from "react-redux";
import React, { Component } from "react";
import { getItems, createNewItem } from "../actions/itemsAction";

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
    this.props.createNewItem(new Utter());
  }

  render() {
    return (
      <ItemPage
        mode="Utter"
        url={UTTER_URL}
        new_item={new Utter()}
        items={this.props.items}
        id_item={this.props.id_item}
        name_label="Nome da resposta"
        button_text="Criar nova resposta"
        helper_text={this.props.helper_text}
        item_list_text="Respostas cadastradas"
        name_item={this.props.name_item}
        old_name_item={this.props.old_name_item}
        item_contents={this.props.item_contents}
        old_item_contents={this.props.item_contents}
        notification_text={this.props.notification_text}
        selected_item_position={this.props.selected_item_position}
      />
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getItems: (url) => dispatch(getItems(url)),
  createNewItem: (new_item) => dispatch(createNewItem(new_item))
});

export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);