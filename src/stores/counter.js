import { defineStore } from "pinia";

/**
 * In Setup Stores:
 * ref()s become state properties aka state aka data
 * computed()s become getters     aka getters
 * function()s become actions     aka actions aka method
 */

// export const useStore = defineStore("card", () => {
//   const favourite = ref(false);
//   const count = ref(10);

//   function saveBusStop() {
//     favourite.value = favourite !== true;
//     console.log(favourite.value);
//     console.log("saved");
//   }

//   return { favourite, count, saveBusStop };
// });

export const useStore = defineStore("card", {
  state: () => ({
    favouriteBusStops: [],
    query: "",
    // isRed: false,
  }),

  /**
   * The busStopID paramter gets passed from timing.vue over to the pinia store.
   * We can then use the value from the parameter for conditional statements.
   * Firstly, since the function is a toggle, we want the bus stop ID to be added
   * to the array if it does not exist in the array yet. If the ID already exist in
   * the array, we want to remove it.
   */
  actions: {
    toggleBusStop(busStopID) {
      if (this.favouriteBusStops.includes(busStopID)) {
        // https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array
        // How to remove an item from an array using filter.
        this.favouriteBusStops = this.favouriteBusStops.filter(
          (id) => id !== busStopID
        );
        console.log("Removed from favourites.");
        // this.isRed = false;
      } else {
        this.favouriteBusStops.push(busStopID);
        console.log("Favourited!");
        // this.isRed = true;
      }
    },
    clearInput() {
      this.query = "";
    },
  },

  /**  https://www.npmjs.com/package/pinia-plugin-persistedstate
   *  Persists this store's state in localStorage to reuse across sessions
   *  Note that this is not efficient for large to extremely large state trees,
   *  as on every state change, the entire tree is serialized and saved.
   *  https://github.com/prazdevs/pinia-plugin-persistedstate#-usage
   *  This can be customised to use other storage implementations like sessionStorage
   */
  persist: true,
});
