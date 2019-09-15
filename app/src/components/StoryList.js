import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { Creators as StoryAction } from "../ducks/stories";
import { Grid, Card } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import DeleteIcon from '@material-ui/icons/Delete';
import UtterIcon from '../icons/UtterIcon';
import IntentIcon from '../icons/IntentIcon';


const styles = {
    icon_delete: {
        color: "#4b3953",
        opacity: 0.5,
        top: "0px",
        marginBottom: "20px"
    },
    intent_icon: {
        fill: '#4b3953',
        marginRight: '10px'
    },
    utter_icon: {
        fill: '#f26a53',
        marginRight: '10px'
    },
    card_intent: {
        border: '1px solid #4b3953',
        color: '#4b3953'
    },
    card_utter: {
        border: '1px solid #f26a53',
        color: '#f26a53',
        marginLeft: '24px'

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



const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f6f9f9" : "white",
    padding: grid,
    minWidth: "370px"
});

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    getIcon(type) {
        return type === "intent" ? <IntentIcon style={styles.intent_icon} /> : <UtterIcon style={styles.utter_icon} />
    }

    onDragEnd(result) {
        if (!result.destination) {
            return;
        }
        this.props.reorderContent(result.source.index, result.destination.index)
    }

    getDrag(provided, snapshot) {
        return (
            <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
            >
                {this.props.content.map((item, content_position) => (
                    <Draggable key={'list_' + content_position} draggableId={'item' + content_position} index={content_position}>
                        {(provided, snapshot) => (
                            <div key={"card_" + item.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                <Grid container spacing={2} alignItems="flex-end">
                                    <Grid item xs={11}>
                                        <Card style={item.type === "intent" ?
                                            getIntentStyle(
                                                provided.draggableProps.style,
                                            ) : getUtterStyle(
                                                provided.draggableProps.style,
                                            )}
                                        >
                                            {this.getIcon(item.type)}
                                            {item.name}
                                        </Card>
                                    </Grid>
                                    <Grid item xs={1}>
                                        <DeleteIcon
                                            style={styles.icon_delete}
                                            type="button"
                                            onClick={() => this.props.deleteContent(content_position)}>
                                        </DeleteIcon>
                                    </Grid>
                                </Grid>
                            </div>
                        )}
                    </Draggable>
                ))}
                {provided.placeholder}
            </div>
        )
    }

    getContent() {
        if (this.props.content.length !== 0) {
            return (
                <div>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => this.getDrag(provided, snapshot)}
                        </Droppable>
                    </DragDropContext>
                </div>
            )

        } else {
            return <div>Não há diálogos!</div>
        }
    }

    render() {
        return (
            <div>
                {this.getContent()}
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
