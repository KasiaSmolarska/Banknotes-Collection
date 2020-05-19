import { FETCH_BANKNOTE_STATISTICS } from "../actions/types";
import { FetchBanknoteStatistics, StatisticsState } from "./interfaces/statisticsInterface";

const initialState: StatisticsState = {
  banknote: {},
  loading: true,
};

export type StatisticsActionTypes = FetchBanknoteStatistics;

export default function (state: StatisticsState = initialState, action: StatisticsActionTypes): StatisticsState {
  switch (action.type) {
    case FETCH_BANKNOTE_STATISTICS:
      return {
        ...state,
        banknote: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
