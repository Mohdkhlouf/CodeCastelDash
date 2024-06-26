import { useQuery } from "@tanstack/react-query";

const useFetchSingleData = (id) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories/stories/${id}`).then(
        (res) => res.json()
      ),
    queryKey: ["singleStory"],
  });

  return { data, isLoading, error };
};

export default useFetchSingleData;
