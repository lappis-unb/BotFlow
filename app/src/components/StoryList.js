import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { reorderList, removeItem } from "../reducers/storyReducer";
import { Grid, Card, InputAdornment } from '@material-ui/core';
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

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

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
    background: isDraggingOver ? "lightgrey" : "white",
    padding: grid,
    width: 250
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

        const items = reorder(
            this.props.item_contents,
            result.source.index,
            result.destination.index
        );

        this.props.reorderList(items)
    }

    render() {
        console.log(this.props.item_contents)
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={getListStyle(snapshot.isDraggingOver)}
                        >
                            {this.props.item_contents.map((item, item_position) => (
                                <Draggable key={'list_' + item_position} draggableId={'item' + item_position} index={item_position}>
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
                                                        onClick={() => this.props.removeItem(item_position)}>
                                                    </DeleteIcon>
                                                </Grid>
                                            </Grid>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}
const mapStateToProps = state => { return { ...state.story } };

const mapDispatchToProps = dispatch => ({
    reorderList: (arr) => dispatch(reorderList(arr)),
    removeItem: (item_position) => dispatch(removeItem(item_position))
});

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
