import { Flags } from "./Flags";
import { NationName } from "./NationName";

export interface Nation {

    name: NationName;
    population: number;
    currencies: object;
    capital: string[];
    languages: object;
    cca3: string
    cca2: string;
    flags: Flags;
}