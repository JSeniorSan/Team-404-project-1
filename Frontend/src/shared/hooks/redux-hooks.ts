import { useDispatch } from "react-redux";
import { AppDispatch } from "../api/index";
export const useAppDispatch = () => useDispatch<AppDispatch>();
