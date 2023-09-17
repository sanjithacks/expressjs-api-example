export async function get_token(id) {
  try {
    const name_regex = new RegExp(/^[a-zA-Z\d]{1,16}$/);
    const check_name = name_regex.test(id);
    if (!check_name) {
      console.warn("Name contains illegal characters");
      return null;
    } else {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );

      if (!response.ok) {
        console.warn("Unable to fetch data from API");
        return null;
      }
      const response_data = await response.json();
      const name = response_data?.name;
      const price = response_data?.market_data?.current_price?.usd;
      const market_cap = response_data?.market_data?.market_cap?.usd;

      if (
        name != "undefined" &&
        price != "undefined" &&
        market_cap != "undefined"
      ) {
        return { name, price, market_cap };
      } else {
        return null;
      }
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
