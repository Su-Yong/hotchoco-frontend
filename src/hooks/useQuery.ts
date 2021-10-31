const useQuery = (key: string): [boolean, string | null] => {
  const search = new URLSearchParams(window.location.search);

  return [search.has(key), search.get(key)];
};

export default useQuery;
