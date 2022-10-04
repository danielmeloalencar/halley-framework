const iterations = (child, keepDataAttributes) => {
    if (Array.isArray(child)) {
      return child.map(c => iterations(c, keepDataAttributes));
    }
    if (child && child.props && child.props.hasOwnProperty('for')) {
      const iteration = child.props['for'];
      return getChildren(child, iteration, keepDataAttributes);
    } else if (child && child.props && child.props.children) {
      return {
        ...child,
        props: {
          ...child.props,
          'for':
            child.props['for'] && keepDataAttributes
              ? child.props['for']
              : undefined,
          children: iterations(child.props.children, keepDataAttributes)
        }
      };
    }
    return child;
  };
  
  const getChildren = (child, iteration, keepDataAttributes) => {
    const { children } = child.props;
    if (typeof children === 'function') {
      if (Array.isArray(iteration)) {
        return iteration.map((it, ind) => {
          let executedChild = children(it, ind);
          if (executedChild.props && executedChild.props.children) {
            executedChild = getExecutedChildren(
              executedChild,
              keepDataAttributes
            );
          }
          return getChild(child, executedChild, keepDataAttributes);
        });
      } else if (typeof iteration === 'number' && !isNaN(iteration)) {
        return Array(iteration)
          .fill()
          .map((val, ind) => {
            let executedChild = children(ind + 1, ind);
            if (executedChild.props && executedChild.props.children) {
              executedChild = getExecutedChildren(
                executedChild,
                keepDataAttributes
              );
            }
            return getChild(child, executedChild, keepDataAttributes);
          });
      } else if (typeof iteration === 'object') {
        return Object.keys(iteration).map((k, ind) => {
          let executedChild = children(iteration[k], k, ind);
          if (executedChild.props && executedChild.props.children) {
            executedChild = getExecutedChildren(
              executedChild,
              keepDataAttributes
            );
          }
          return getChild(child, executedChild, keepDataAttributes);
        });
      }
    } else {
      const childIterations = [];
      const childPassed = {
        ...child,
        props: {
          ...child.props,
          'for':
            child.props['for'] && keepDataAttributes
              ? child.props['for']
              : undefined,
          children: iterations(
            childIterations.length ? childIterations : children,
            keepDataAttributes
          )
        }
      };
      const childrenPassed = [];
      if (Array.isArray(iteration)) {
        iteration.forEach(() => childrenPassed.push(childPassed));
      } else if (typeof iteration === 'number') {
        for (let x = 1; x <= iteration; x++) {
          childrenPassed.push(childPassed);
        }
      } else if (typeof iteration === 'object') {
        for (let x = 1; x <= Object.keys(iteration); x++) {
          childrenPassed.push(childPassed);
        }
      }
      return childrenPassed.length ? childrenPassed : child;
    }
  
    return child;
  };
  
  const getExecutedChildren = (executedChild, keepDataAttributes) => {
    return {
      ...executedChild,
      props: {
        ...executedChild.props,
        'for':
          executedChild.props['for'] && keepDataAttributes
            ? executedChild.props['for']
            : undefined,
        children: iterations(executedChild.props.children, keepDataAttributes)
      }
    };
  };
  
  const getChild = (child, executedChild, keepDataAttributes) => {
    return {
      ...child,
      props: {
        ...child.props,
        'for':
          child.props['for'] && keepDataAttributes
            ? child.props['for']
            : undefined,
        children: executedChild
      }
    };
  };
  
  export default iterations;
  
  