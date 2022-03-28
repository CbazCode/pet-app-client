import axios from "axios";

export const uploadImage = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    process.env.NEXT_PUBLIC_CLOUD_UPDATE_PRESET ?? ""
  );
  formData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUD_NAME ?? "");
  try {
    const data = await axios.post(
      process.env.NEXT_PUBLIC_CLOUD_API ?? "",
      formData
    );
    return { public_id: data.data.public_id, url: data.data.url };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const toCapitalizeString = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
