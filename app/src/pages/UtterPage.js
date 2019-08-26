import React, { Component } from "react";
import ItemsList from "../components/ItemsList";
import UtterForm from "../components/UtterForm";
import { connect } from "react-redux";
import * as utterAction from "../actions/uttersAction";
import MessageIcon from '@material-ui/icons/Message';
import { SaveButtonCheck, Done, Add, CreateNewUtter } from '../styles/button';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
//import Drawer from '@material-ui/core/Drawer'

import IconButton from '@material-ui/core/IconButton';

import Menu from '@material-ui/core/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuItem from '@material-ui/core/MenuItem';

import TextField from '@material-ui/core/TextField';

class UtterPage extends Component {
  constructor(props) {
    super(props);
    this.props.getUtters();
  }

  isEnableUtterButton() {
    let has_empty_fields = false;
    const no_modifications = (JSON.stringify(this.props.current_utter) !== JSON.stringify(this.props.old_utter));

    this.props.current_utter.utters.forEach(utter => {
      utter.utterText.forEach(text => {
        if ((text.text).trim().length === 0) {
          has_empty_fields = true;
        }
      })
    });

    return (
      no_modifications &&
      !has_empty_fields &&
      (this.props.current_utter.nameUtter.length !== 0)
    );
  }

  getAppBar() {
    let utter_name = (this.props.current_utter !== undefined) ? this.props.current_utter.nameUtter : "";

    const options = ['Apagar'];
    const ITEM_HEIGHT = 20;
    return (
      <AppBar position="static" style={{ background: "#f6f9f9" }}>
        <Toolbar>
          <Grid item xs={9}>
            <TextField
              helperText={this.props.helper_text}
              id="utter-name"
              label="Nome da resposta"
              margin="normal"
              type="text"
              value={utter_name}
              onChange={(e) => this.props.setUtterName(e.target.value, this.props.utters)}
            />
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" color="inherit">
              <Button
                disabled={!this.isEnableUtterButton()}
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => this.props.saveData(this.props.current_utter, this.props.utters)}>
                <SaveButtonCheck>
                  <Done />
                  <label>
                    Gravar
                </label>
                </SaveButtonCheck>
              </Button>
              <IconButton
                onClick={e => this.props.handleClickMenu(e)}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={this.props.anchorEl}
                keepMounted
                open={this.props.anchorEl}
                onClose={this.props.handleCloseDelete}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.0,
                    width: 80,
                  },
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    selected={option === 'Apagar'}
                    onClick={() => this.props.removeUtter(this.props.current_utter._id)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
              {this.props.text}
            </Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    )
  }

  render() {
    // style={{ height: "calc(100vh - 64px)", background: "red" }}
    // , height: "calc(100vh - 64px)", overflowY: "auto"
    // style={{ height: "calc(100vh - 138px )", overflowY: "auto" }}
    return (
      <Grid container>
        <Grid item xs={3} style={{ background: "#dae8ea"}}>
          <Button
            style={{margin: "16px 24px"}}
            variant="contained"
            color="secondary"
            onClick={() => this.props.createNewUtter()}
            >
            <CreateNewUtter>
              <Add />
              <label>Criar Resposta</label>
            </CreateNewUtter>
          </Button>
          <ItemsList items={this.props.utters} icon={<MessageIcon />} text="Respostas cadastradas" />
        </Grid>
        <Grid item xs={9}>
          {this.getAppBar()}
          <div style={{height:"calc(100vh - 64px - 72px)", overflowY: "auto"}}>
            <UtterForm />
          </div>
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = state => { return { ...state.utterReducer } };

const mapDispatchToProps = dispatch => ({
  getUtters: () => dispatch(utterAction.getUtters()),
  createNewUtter: () => dispatch(utterAction.createNewUtter()),
  removeUtter: (utter_id) => dispatch(utterAction.removeUtter(utter_id)),
  setUtterName: (utter_name) => dispatch(utterAction.setUtterName(utter_name)),
  saveData: (current_utter, utters) => dispatch(utterAction.saveData(current_utter, utters)),
});


export default connect(mapStateToProps, mapDispatchToProps)(UtterPage);
