import { IMatch } from "../../../../challonge/src/matches/match.interface";
import { AxiosResponse } from "axios";

export function list(externalId: string): Promise<AxiosResponse<IMatch[]>>;
