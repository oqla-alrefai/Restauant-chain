import { useState } from "react";

const useBreadcrumb = (initialTrail, initialView) => {
  const [trail, setTrail] = useState(initialTrail);
  const [view, setView] = useState(initialView);

  const updateBreadcrumb = (newItem) => {
    if (newItem === trail[trail.length - 1]) return;
    setTrail([...trail, newItem]);
    const newView = newItem.split(" ")[1];
    setView(newView);
  };

  const handleBack = () => {
    if (trail.length > 2) {
      setTrail((prevTrail) => {
        setView(prevTrail[prevTrail.length - 2].split(" ")[1]);
        return prevTrail.slice(0, -1);
      });
      return;
    }
    setTrail((prevTrail) => {
      setView(prevTrail[0]);
      return [prevTrail[0]];
    });
  };

  return {
    trail,
    view,
    updateBreadcrumb,
    handleBack,
  };
};

export default useBreadcrumb;
