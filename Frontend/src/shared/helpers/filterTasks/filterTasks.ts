import { IPanel, ITodo } from "shared/api/todoQueryApi/todoInterfaces";

export function filterTasks(colums: IPanel[]) {
  const allTasks: ITodo[] = [];
  colums.forEach((panel) => {
    const filteredTasks = panel.tasks.filter((task) => {
      return panel.id == task.panel_id;
    });
    allTasks.push(...filteredTasks);
  });
  console.log("allTasks", allTasks);

  return allTasks;
}
