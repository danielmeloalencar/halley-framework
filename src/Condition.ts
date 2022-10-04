import iterations from './Iterations';
import conditions from './Conditions';


export const Condition = ({ children, keepDataAttributes = true }) => {
  if (children) {
    children = Array.isArray(children) ? children : [children];
    //   Loop Stage
    children = children.map(child => iterations(child, keepDataAttributes));
    //    Filter Stage
    children = children
      .map(child => conditions(child, keepDataAttributes))
      .filter(Boolean);
    return children;
  } else return "";
};
