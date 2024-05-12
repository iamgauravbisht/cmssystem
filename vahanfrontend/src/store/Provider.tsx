import React, { createContext, useReducer } from "react";

type IState = {
  tableName: string;
  tableId: string;
  rowId?: string;
};
const initialState: IState = {
  tableName: "",
  tableId: "",
  rowId: "",
};

// Define the context type
type MyContextType = {
  state: IState;
  dispatch: React.Dispatch<Action>;
};

export const MyContext = createContext<MyContextType | undefined>(undefined);

type Action =
  | { type: "SET_TABLE_NAME"; payload: IState["tableName"] }
  | { type: "SET_TABLE_ID"; payload: IState["tableId"] }
  | { type: "SET_ROW_ID"; payload: IState["rowId"] };

function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case "SET_TABLE_NAME":
      return { ...state, tableName: action.payload };
    case "SET_TABLE_ID":
      return { ...state, tableId: action.payload };
    case "SET_ROW_ID":
      return { ...state, rowId: action.payload };
    default:
      return state;
  }
}

//Provider
type Props = {
  children: React.ReactNode;
};

export default function MyProvider({ children }: Props): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
}
