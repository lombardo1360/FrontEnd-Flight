import { Flight } from "./flight.model";

export class Journey{

  constructor(public origin: string,
              public destination: string,
              public price: number,
              public flight: Flight[]){}
}
