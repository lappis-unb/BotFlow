import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { Creators as StoryAction } from "../ducks/stories";
import { Grid, Card } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import DeleteIcon from '@material-ui/icons/Delete';
import UtterIcon from '../icons/UtterIcon';
import IntentIcon from '../icons/IntentIcon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { message } from "../utils/messages";
import { Link } from 'react-router-dom'




const styles = {
    intent_icon: {
        fill: '#4b3953',
        color: '#4b3953',
    },
    utter_icon: {
        fill: '#f26a53',
        color: '#f26a53',
    },
    card: {
        flexBasis: 'content',
        width: '350px',
        margin: '0 0 1em',
        background: 'white'
    },
}



export default class StoryCard extends Component {

    getContent(content) {
        let list = content.map((item, index) => {
            if (item.type === "intent") {
                return (
                    <Typography style={styles.intent_icon} varant="body1" noWrap>
                        <IntentIcon />
                        {item.name}
                    </Typography>
                )
            }
            else {
                return (
                    <Typography style={styles.utter_icon} varant="body1" noWrap>
                        <UtterIcon />
                        {item.name}
                    </Typography>
                )
            }
        })
        return list;
    }

    render() {
        return (
            <Link to={'/stories/' + this.props.story.id} style={{ textDecoration: 'none' }}>
                <Card style={styles.card}>
                    {this.getContent(this.props.story.content)}
                </Card>
            </Link>
        );
    }
}
