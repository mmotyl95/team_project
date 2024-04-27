/**
 * Get the bus arrival data with the bus stop code. Since this
 * function is required in both timing and home page, refactor
 * it out into a single file so that it can be reused easily.
 * Returns an object string key value of "services" which contains arrays,
 * with each array contains an object with the specifics of next bus arrival
 */

interface BusArrival {
services: any;
  // define the shape of the JSON object returned by the API
  // e.g.
  // busStopId: string;
  // services: Array<{
  //   no: string;
  //   nextBus: {
  //     estimatedArrival: string;
  //   }
  // }>;
}

export async function getBusArrival(busStopID: string): Promise<BusArrival> {
  const res = await fetch(`https://arrivelah2.busrouter.sg/?id=${busStopID}`);
  return res.json();
}

/* Previous method before typescript 

export const getBusArrival = async (busStopID) =>
  fetch(`https://arrivelah2.busrouter.sg/?id=${busStopID}`).then((res) =>
    res.json()
  ); 
  */
