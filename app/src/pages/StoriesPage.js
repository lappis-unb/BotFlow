import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
//import { Creators as IntentAction } from '../ducks/intents';

import GridList from '@material-ui/core/GridList';

import { Creators as StoryAction } from "../ducks/stories";
import GridListTile from '@material-ui/core/GridListTile';

class StoriesPage extends Component {

  render() {
    return (
      <div >
        <GridList cellHeight={160} cols={3}>
          {[1,2,3,4].map((tile, index) => (
            <GridListTile key={'stories_' + index} cols={1}>
              <div>texto</div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    )
  }
}


const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
