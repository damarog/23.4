import {DragSource} from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

export default DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Note)