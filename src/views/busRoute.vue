<script setup>
async function busRoute() {
  const routes = await fetch(
    `https://tih-api.stb.gov.sg/smartdocs/v1/sendrequest?targeturl=https://api.stb.gov.sg/services/transport/v2/bus-routes/${143}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        "x-api-key": "MxMU9TgdQUH6tCqGs4gVEFgAGZWOA4Q7",
      },
    }
  ).then((res) => res.json());

  const actualRouteData = JSON.parse(
    decodeURIComponent(routes.responseContent)
  );

  console.log(actualRouteData.data);
}

busRoute();

const props = defineProps(["busNumber"]);

console.log(props.busNumber);
</script>
<template>
  <div></div>
</template>

<style lang="scss" scoped></style>
