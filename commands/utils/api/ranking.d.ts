import { IRankingEntry } from "../../../../challonge/src/ranking/ranking.interface";
import { AxiosResponse } from "axios";

export function current(): Promise<AxiosResponse<IRankingEntry[]>>;
export function currentForMe(
  externalId: string
): Promise<AxiosResponse<IRankingEntry>>;
export function historyForMe(
  externalId: string
): Promise<AxiosResponse<IRankingEntry[]>>;
