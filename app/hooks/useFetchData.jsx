import { useQuery } from "@tanstack/react-query";

const UseFetchData = (slug) => {
  const { data, isLoading, error } = useQuery({
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${slug}/${slug}`).then(
        (res) => res.json()
      ),
    queryKey: [slug],
  });
  return { data, isLoading, error };
};

export default UseFetchData;
