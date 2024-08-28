import {
  LOADER_OPEN,
  LOADER_CLOSE,
} from 'src/store/constants/common';

interface IInitialStateProps {
  type?: string;
  isLoader: boolean;
}

export const initialState: IInitialStateProps = {
  isLoader: false
};

const customizationReducer = (state = initialState, action: IInitialStateProps) => {
  switch (action.type) {
    case LOADER_OPEN:
      return {
        ...state,
        isLoader: true,
      };

    case LOADER_CLOSE:
      return {
        ...state,
        isLoader: false,
      };

    default:
      return state;
  }
};

export default customizationReducer;
