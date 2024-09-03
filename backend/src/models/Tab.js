let tabs = [];

let currentId = 1;

export const generateId = () => currentId++;
export const getTabs = () => tabs;
export const setTabs = (newTabs) => {
  tabs = newTabs;
};
