import { useEffect, useState } from "react";

export default function useOutsideClick(ref) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setStatus(false);
      } else {
        setStatus(true);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return status;
}
