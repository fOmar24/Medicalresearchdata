import { useState } from "react";
import { createSuiClient } from "../utils/sui";
import { PaginatedObjectsResponse } from "@mysten/sui/client"; // ✅ Import the correct type

const FetchData = () => {
  const [data, setData] = useState<PaginatedObjectsResponse | null>(null); // ✅ Update state type

  const fetchData = async () => {
    const provider = createSuiClient();
    const address = "0xd0e9f00ddc63da09b4d412ca32ba71006061346212111b7001c66573d5d99bbf"; // Replace with user's address
    const objects: PaginatedObjectsResponse = await provider.getOwnedObjects({ owner: address }); // ✅ Ensure proper typing
    setData(objects); // ✅ No more type error
  };

  return (
    <div>
      <button onClick={fetchData} className="px-4 py-2 bg-purple-500 text-white">
        Fetch Data
      </button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FetchData;
