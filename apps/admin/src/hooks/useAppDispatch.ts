import { Dispatcher } from "@/redux/store";
import { useDispatch } from "react-redux";

export const useAppDispatch: () => Dispatcher = useDispatch;
