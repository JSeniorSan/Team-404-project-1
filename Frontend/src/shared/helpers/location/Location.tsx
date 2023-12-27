import { useLocation } from "react-router-dom";

export function useLastPathname() {
  const location = useLocation();
  const lastName = location.pathname.split("/")[2];
  return lastName;
}
