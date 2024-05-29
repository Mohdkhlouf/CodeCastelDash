const DeleteData = async (setData, id) => {
  try {
    const response = await fetch(
      `https://code-castle-backend.vercel.app/api/v1/stories/delete-story/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authentication headers
          // 'Authorization': 'Bearer YOUR_AUTH_TOKEN'
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Filter out the deleted story from the data
    setData((prevData) => prevData.stories.filter((story) => story.id !== id));
  } catch (error) {
    console.error("Error deleting the story:", error);
  }

  return <div>delted</div>;
};

export default DeleteData;
