import React from "react";

export const getGender = (gender) =>{
  if(gender==="young")
    return "Còn nhỏ";
  else if(gender==="mature")
    return "Trưởng thành";
  else
    return "Già"
}

export function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

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


