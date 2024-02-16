const getInitials = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
  };
  
export {getInitials};
  