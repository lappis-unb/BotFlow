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
    intent: {
        color: '#4b3953',
        margin: '16px auto 6px',
        fontWeight:'bold',
    },
    utter: {
        color: '#f26a53',
        marginLeft: 12,
    },
    intent_icon: {
        fill: '#4b3953',
        marginRight: 8,
        verticalAlign: 'middle',
    },
    utter_icon: {
        fill: '#f26a53',
        marginRight: 8,
        verticalAlign: 'middle',
    },
    card: {
        background: 'white',
        margin:'16px 8px',
        padding:'0 12px 16px',
        breakInside: 'avoid',
        
//        width: '14vw',
//        minWidth: '96px',
//        width:'100%',
//        width:'100%',
//        maxWidth: '16vw',

    },
}



export default class StoryCard extends Component {

    getContent(content) {
        let list = content.map((item, index) => {
            if (item.type === "intent") {
                return (
                    <Typography style={styles.intent} varant="body1" noWrap>
                        <IntentIcon style={styles.intent_icon} />
                        {item.name}
                    </Typography>
                )
            }
            else {
                return (
                    <Typography style={styles.utter} varant="body1" noWrap>
                        <UtterIcon style={styles.utter_icon} />
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
