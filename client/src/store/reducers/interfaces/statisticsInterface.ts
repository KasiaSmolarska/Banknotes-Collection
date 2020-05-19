import { CountriesKeys } from "../../../utils/countriesCodes";
import { Continents } from "../../../utils/country-continent";
import { CurrenciesKeys } from "../../../utils/currenciesCodes";
import { FETCH_BANKNOTE_STATISTICS } from "../../actions/types";

type StatsElement<P> = { _id: P; total: number }[];

interface BanknoteStats {
  countries?: StatsElement<CountriesKeys>;
  continents?: StatsElement<Continents>;
  favorites?: StatsElement<boolean>;
  dateCreated?: StatsElement<string>;
  currencies?: StatsElement<CurrenciesKeys>;
  values?: { _id: number }[];
  issueYears?: StatsElement<number>;
  own?: StatsElement<boolean>;
  types?: StatsElement<"Polymer" | "Paper">;
}

export interface StatisticsState {
  banknote: BanknoteStats;
  loading: boolean;
}

export interface FetchBanknoteStatistics {
  type: typeof FETCH_BANKNOTE_STATISTICS;
  payload: BanknoteStats;
}