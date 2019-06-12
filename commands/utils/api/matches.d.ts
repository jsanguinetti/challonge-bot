import { IMatchesResponse } from "../../../../challonge/src/matches/match.interface";
import { AxiosResponse } from "axios";

export function list(
  externalId: string,
  tournamentNumber?: number
): Promise<AxiosResponse<IMatchesResponse>>;
