import { ReactElement, useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import "./App.css";

const API_URL = "https://ws.audioscrobbler.com/2.0/";
const API_KEY = "430711e29ad09c493dad2831eb0bbd08";

const paramsStringFromQuery = (artist: string): string =>
  `?method=artist.search&artist=${artist}&api_key=${API_KEY}&format=json`;

function App(): ReactElement {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const search = useCallback(
    debounce(async (query: string) => {
      // async function search(query) {
      if (!query) {
        setResults([]);
        return;
      }

      const url = API_URL + paramsStringFromQuery(query.trimEnd());
      const data = await fetch(url).then((r) => r.json());

      const results = data?.results?.artistmatches?.artist;

      if (results) {
        setResults(results);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    search(query);
  }, [query]);

  return (
    <div>
      <input
        placeholder="search for stuff"
        value={query}
        onChange={(e) => {
          const value = e.target.value;
          setQuery(value.trimStart());
        }}
      />

      <h1>results: </h1>
      {results.length === 0 && <b>No results yet or nothing matched</b>}

      {results.map(
        // todo: missing Artist TS interface
        (artist) => (
          <div key={artist?.name}>{artist?.name}</div>
        )
      )}
    </div>
  );
}

export default App;
