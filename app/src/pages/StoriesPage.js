import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Creators as StoryAction } from '../ducks/stories';
import { Link } from 'react-router-dom'

import GridList from '@material-ui/core/GridList';

import GridListTile from '@material-ui/core/GridListTile';

class StoriesPage extends Component {
  constructor(props) {
    super(props);
    this.props.getStories();
  }

  getStoriesList() {
    if (this.props.stories !== undefined)
      return this.props.stories.map((story, index) => (
        <GridListTile key={'stories_' + index}>
          <Link to={'/stories/' + story.id}>{story.name}</Link>
        </GridListTile>
      ))
  }

  render() {
    return (
      <div>
        <GridList cols={6}>
          {this.getStoriesList()}
        </GridList>
      </div>
    )
  }
}


const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoriesPage);
