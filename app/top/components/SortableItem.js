import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ListItem from './ListItem';

export default function SortableItem({ id, isDisabled = false }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
    disabled: isDisabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 10 : 'auto',
    cursor: isDisabled ? 'default' : 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...(!isDisabled ? listeners : {})}>
      <ListItem text={id} />
    </div>
  );
}
