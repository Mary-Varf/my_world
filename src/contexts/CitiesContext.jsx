import { useEffect, createContext, useContext, useReducer } from "react";

const URL = "http://localhost:9000";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  error: "",
  currentcity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, city: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("unknown action type");
  }
}

const CitiesProvider = ({ children }) => {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      }
    };
    fetchCities();
  }, []);

  const getCity = async (id) => {
    if (+id === +currentCity.id) return;

    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/?id=${id}`);
      const data = await res.json();

      if (data?.length > 0) {
        dispatch({ type: "city/loaded", payload: data[0] });
      }
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  };

  const createCity = async (city) => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "aplication/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  };

  const deleteCity = async (id) => {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "rejected", payload: err });
    }
  };
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside provider");

  return context;
};

export { CitiesContext, useCities, CitiesProvider };
