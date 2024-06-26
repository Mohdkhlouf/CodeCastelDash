import DataTable from "@/app/components/dashboard/datatable/datatable";
import UseFetchDataQuiery from "@/app/hooks/UseFetchDataQuiery";
const ChaptersOfCategory = ({ slug, id }) => {
  const { data, error, isLoading } = UseFetchDataQuiery(slug, id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  if (!data || !data.chapters) {
    return <p>No Chapters found</p>;
  }
  console.log("chapters", data);
  return <DataTable data={data.chapters} />;
};

export default ChaptersOfCategory;
