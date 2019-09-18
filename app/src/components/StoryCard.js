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




const styles = {
    intent_icon: {
        fill: '#4b3953',
    },
    utter_icon: {
        fill: '#f26a53',
    },
    card_intent: {
        border: '1px solid #4b3953',
        color: '#4b3953',
        boxShadow: 'none',
        padding: "12px 12px 6px",

    },
    card_utter: {
        border: '1px solid #f26a53',
        color: '#f26a53',
        marginLeft: '24px',
        boxShadow: 'none',
        padding: "12px 12px 6px",
    }
}

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    display: 'flex',
    background: 'white',

    ...draggableStyle
});

const getUtterStyle = (isDragging, draggableStyle) => ({
    ...getItemStyle(isDragging, draggableStyle),
    ...styles.card_utter
})

const getIntentStyle = (isDragging, draggableStyle) => ({
    ...getItemStyle(isDragging, draggableStyle),
    ...styles.card_intent
})

class StoryCard extends Component {

    getIcon(type) {
        return type === "intent" ? <IntentIcon style={styles.intent_icon} /> : <UtterIcon style={styles.utter_icon} />
    }

    getDrag(content) {
        return (
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={11}>
                        <Card style={item.type === "intent" ?
                            getIntentStyle(
                                provided.draggableProps.style,
                            ) : getUtterStyle(
                                provided.draggableProps.style,
                            )}
                        >
                            <Grid container>
                                <Grid item xs={1}>
                                    {this.getIcon(item.type)}
                                </Grid>
                                <Grid item xs={11}>
                                    <Typography varant="body1" noWrap>{item.name}</Typography>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="primary" m={0}
                            onClick={() => this.props.deleteContent(content_position)}>
                            <DeleteIcon style={{ opacity: 0.5 }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.getDrag(this.props.content)}
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoryCard);
