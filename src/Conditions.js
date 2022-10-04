const condition = (child, keepDataAttributes) => {
    if (Array.isArray(child)) {
      return child.map(c => condition(c));
    }
    if (child.props && child.props.hasOwnProperty('if')) {
      if (Boolean(child.props['if']) === false) {
        return "";
      }
      if (child.props.children) child = getChildren(child, keepDataAttributes);
    } else if (child.props && child.props.children) {
      child = getChildren(child, keepDataAttributes);
    }
    return child;
  };
  
  const getChildren = (child, keepDataAttributes) => {
    let { children } = child.props;
    if (Array.isArray(children)) {
      children = children
        .map(innerChild => condition(innerChild))
        .filter(Boolean);
    } else {
      children = condition(children);
    }
    child = {
      ...child,
      props: {
        ...child.props,
        'if':
          child.props['if'] && keepDataAttributes
            ? child.props['if']
            : undefined,
        children
      }
    };
    return child;
  };
  
  export default condition;

  