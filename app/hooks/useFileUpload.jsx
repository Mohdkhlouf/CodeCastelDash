import { useMutation } from "@tanstack/react-query";

const useFileUpload = () => {
  const fileUploadMutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dek7zdvbp/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      return response.json();
    },
  });

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "codeCastle");
    const response = await fileUploadMutation.mutateAsync(formData);
    if (!response) console.log("Error with uploading to clodinary.");

    return response.secure_url;
  };
  return { uploadFile, ...fileUploadMutation };
};

export default useFileUpload;
