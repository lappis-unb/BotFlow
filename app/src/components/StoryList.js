import { connect } from "react-redux";
import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import UtterIcon from '../icons/UtterIcon';
import { message } from "../utils/messages";
import IntentIcon from '../icons/IntentIcon';
import { Grid, Card } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SnackbarDelete from '../components/DeleteSnackbar';
import { Creators as StoryAction } from "../ducks/stories";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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


const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#f6f9f9" : "white",
    padding: grid,
    width: "420px",

});

class StoryList extends Component {
    constructor(props) {
        super(props);
        this.onDragEnd = this.onDragEnd.bind(this);
        this.state = {
            undo_delete: false
        }
        this.handleSnackbarClick = this.handleSnackbarClick.bind(this)
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
                                            onClick={() => this.handleDelete(content_position)}>
                                            <DeleteIcon style={{ opacity: 0.5 }} />
                                        </IconButton>
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
            return <Typography variant="body1">{message.no_dialogs}</Typography>
        }
    }
    handleSnackbarClick(value) {
        this.setState({ undo_delete: value });
    }
    handleDelete(content_position) {
        this.handleSnackbarClick(true);
        this.props.deleteContent(content_position);
    }

    render() {
        return (
            <div>
                {this.getContent()}

                <SnackbarDelete
                    handleSnackbarClick={this.handleSnackbarClick}
                    handleUndo={this.props.undoDeleteContent}
                    undo={this.state.undo_delete}
                />
            </div>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => bindActionCreators(StoryAction, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
