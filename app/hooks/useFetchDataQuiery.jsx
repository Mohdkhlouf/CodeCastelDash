import { useQuery } from "@tanstack/react-query";

const UseFetchDataQuiery = (slug, storyID) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/${slug}/${storyID}`).then(
        (res) => res.json()
      ),
    queryKey: [slug],
  });
  return { data, isLoading, error };
};

export default UseFetchDataQuiery;
