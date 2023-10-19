import React, { useReducer, createContext, ReactNode } from 'react';

interface State {
  position: 'open' | 'close';
  bookingBreadCrumb: string;
}

interface BreadCrumbState {
  roomBreadCrumb: string;
  headerTitle: string;
}

type Action = { type: 'open' } | { type: 'close' };

type BreadCrumbAction =
  | { type: 'getBookingBreadCrumb'; payload: { id: string } }
  | { type: 'getRoomBreadCrumb'; payload: { id: string } }
  | { type: 'getRoomEditionBreadCrumb'; payload: { id: string } };

export const supertoggleContext = createContext<{
  reducer: (state: State, action: Action) => State;
  dispatch: React.Dispatch<Action>;
  state: State;
  stateBread: BreadCrumbState;
  bookingBreadCrumb: (id: string) => void;
  roomBreadCrumb: (id: string) => void;
  roomEditioBreadCrumb: (id: string) => void;
} | null>(null);

const initialState: State = {
  position: 'open',
  bookingBreadCrumb: '',
};

const breadCrumbInitialState: BreadCrumbState = {
  roomBreadCrumb: '',
  headerTitle: '',
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'open':
      return {
        ...state,
        position: 'open',
      };
    case 'close':
      return {
        ...state,
        position: 'close',
      };
    default:
      return state;
  }
};

const breadCrumbReducer = (state: BreadCrumbState, action: BreadCrumbAction): BreadCrumbState => {
  switch (action.type) {
    case 'getBookingBreadCrumb':
      return {
        roomBreadCrumb: `Rooms/${action.payload.id}`,
        headerTitle: 'Booking Details',
      };
    case 'getRoomBreadCrumb':
      return {
        roomBreadCrumb: `Rooms/${action.payload.id}`,
        headerTitle: 'Rooms Details',
      };
    case 'getRoomEditionBreadCrumb':
      return {
        roomBreadCrumb: `Rooms/${action.payload.id}`,
        headerTitle: 'Rooms Edition',
      };
    default:
      return state;
  }
};

interface ToggleContextProps {
  children: ReactNode;
}

const ToggleContext: React.FC<ToggleContextProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [stateBread, dispatchBread] = useReducer(breadCrumbReducer, breadCrumbInitialState);

  const bookingBreadCrumb = (id: string) => {
    dispatchBread({
      type: 'getBookingBreadCrumb',
      payload: { id },
    });
  };

  const roomBreadCrumb = (id: string) => {
    dispatchBread({
      type: 'getRoomBreadCrumb',
      payload: { id },
    });
  };

  const roomEditioBreadCrumb = (id: string) => {
    dispatchBread({
      type: 'getRoomEditionBreadCrumb',
      payload: { id },
    });
  };

  return (
    <supertoggleContext.Provider
      value={{
        reducer,
        dispatch,
        state,
        stateBread,
        bookingBreadCrumb,
        roomBreadCrumb,
        roomEditioBreadCrumb,
      }}
    >
      {children}
    </supertoggleContext.Provider>
  );
};

export default ToggleContext;
