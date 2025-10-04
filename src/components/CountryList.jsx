import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Spinner from "./Spinner";
import Message from "./Message";

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message={"Add your firs city clicking on a city on a map"} />
    );

  const countriesTempList = cities.map((city) => ({
    country: city.country,
    emoji: city.emoji,
  }));

  let countries = [
    ...countriesTempList
      .reduce((map, val) => {
        if (!map.has(val.country)) {
          map.set(val.country, val);
        }
        return map;
      }, new Map())
      .values(),
  ];

  return (
    <ul className={styles.countryList}>
      {countries?.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  );
};

export default CountryList;
