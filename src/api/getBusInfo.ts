/**
 * Get the bus arrival data with the bus stop code. Since this
 * function is required in both timing and home page, refactor
 * it out into a single file so that it can be reused easily.
 * Returns an object string key value of "services" which contains arrays,
 * with each array contains an object with the specifics of next bus arrival
 */

// define the shape of the JSON object returned by the API
interface BusArrival {
  services: Array<{
    no: string;
    operator: string;
    next: {
      duration_ms: number;
    };
    next2: {
      duration_ms: number;
    };
    next3: {
      duration_ms: number;
    };
  }>;
}

/**
 * An async function returns a Promise in js, but in ts, when the promise is returned,
 * the default data type of the promise is set to any in ts. I need to use the Promise
 * constructor with the angle bracket which contains the interface to tell the compiler
 * what shape will the response be.
 */
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
