import { ITournament } from "../../../../challonge/src/tournaments/tournament.interface";
import { AxiosResponse } from "axios";

export function list(): Promise<AxiosResponse<ITournament[]>>;
