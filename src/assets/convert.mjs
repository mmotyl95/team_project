import { writeFile } from "fs/promises";

import data from "./allBus.json" assert { type: "json" };

// Set the Key value (bus service name) onto the object itself, under the 'id' property
for (const key in data) data[key].id = key;

// Converting the modified JSON data back into JSON string, and writing it back to the original data file
writeFile("./allBus.json", JSON.stringify(data));
