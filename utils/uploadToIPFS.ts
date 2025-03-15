import axios from "axios";
import { db } from "../components/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PINATA_API_KEY = "200ecbd9bbd8f15278f5";
const PINATA_SECRET_API_KEY = "4b1aa97b788f656bd68cfb5b1272e176e203bc8965563636eed366459c9d0947";

export async function uploadFileToIPFS(file: File, userId: string) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const pinataMetadata = JSON.stringify({ name: file.name });
    formData.append("pinataMetadata", pinataMetadata);

    const pinataOptions = JSON.stringify({ cidVersion: 1 });
    formData.append("pinataOptions", pinataOptions);

    const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY,
      },
    });

    const ipfsHash = res.data.IpfsHash;

    // Save metadata in Firestore
    await addDoc(collection(db, "uploads"), {
      userId,
      fileName: file.name,
      ipfsHash,
      timestamp: serverTimestamp(),
    });

    return ipfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
}
