import React from "react";

export const useOnClickOutside = (ref, handler) => {
  React.useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export const useWindowResizeMobile = (breakpoint = 575) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (window.innerWidth < breakpoint) {
      setIsMobile(true);
    }
  }, []);

  React.useEffect(() => {
    const handleIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleIsMobile);

    return () => window.removeEventListener("resize", handleIsMobile);
  }, [breakpoint]);

  return [isMobile];
};


interface StakeSotaProp {
  sendingError?: (error) => void;
  sendingSuccess?: (result) => void;
  onSuccess?: (receipt) => void;
  onError?: (error) => void;
}


