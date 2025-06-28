export const uploadToCoudinary = async (pics: File): Promise<string> => {
    const cloud_name = "duuxvh0gj";
    const upload_preset = "e-comm pharam"; // Must be unsigned

    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
        method: "POST",
        body: data,
    });

    const fileData = await res.json();
    return fileData.secure_url;
};
