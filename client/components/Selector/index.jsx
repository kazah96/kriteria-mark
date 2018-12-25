import React from "react";

const Selector = React.memo(({ children, name }) => (
  <>
  
    {React.Children.map(children, child => child).find(
      w => w.props.name === name,
    )}
  </>
));

export default Selector;
