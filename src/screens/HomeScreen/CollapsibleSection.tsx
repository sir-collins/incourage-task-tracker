import React from "react";
import { List } from "react-native-paper";
import { Task } from "../../types/task";
import TaskItem from "../../components/TaskItem/TaskItem"
interface CollapsibleSectionProps {
  title: string;
  tasks: Task[];
}

const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  tasks,
}) => {
  const titleWithTaskCount = `${title} (${tasks.length})`;
  return (
    <List.AccordionGroup>
      <List.Accordion title={titleWithTaskCount} id={title}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </List.Accordion>
    </List.AccordionGroup>
  );
};

export default CollapsibleSection;
