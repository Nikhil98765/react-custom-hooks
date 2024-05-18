import { useEffect, useState } from "react";

// * Custom hook
export function useFetch(fetchFn, initialVal) {

  // * custom hook can manage its own state. This hook state is also part of parent component, if any changes happen in hook state then parent component will be re-executed again.

  const [fetchedData, setFetchedData] = useState(initialVal);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchFn();
        setFetchedData(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);

  //* returning custom hooks state to parent component.
  return {
    fetchedData,
    error,
    isFetching,
    setFetchedData
  };
}
