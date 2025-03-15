"use client";
import { useState, useEffect } from "react";
import { Database, Clipboard, Upload, LogOut } from "lucide-react"; 
import { app, db } from "../../../components/lib/firebase";
// Fix the import path to match your actual file structure
import { uploadFileToIPFS } from "../../../utils/uploadToIPFS"
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

// Firebase Authentication
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User
} from "firebase/auth";

const auth = getAuth(app);

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setIpfsHash(null);
      setUploading(false);
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!user) {
      alert("Please sign in to upload files.");
      return;
    }
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    try {
      setUploading(true);
      // Pass the user ID to the upload function as required by your implementation
      const hash = await uploadFileToIPFS(file, user.uid);
      if (hash) {
        setIpfsHash(hash);
      } else {
        alert("Upload failed. Please try again.");
      }
      setUploading(false);
    } catch (error) {
      console.error("Upload failed:", error);
      setIpfsHash(null);
      setUploading(false);
      alert("Upload failed: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Bar */}
      <header className="p-4 bg-gray-800 text-white flex justify-between">
        <h1 className="text-lg font-bold">Medical Research Dashboard</h1>
        {user ? (
          <Button onClick={handleSignOut} className="border border-white text-white bg-transparent hover:bg-gray-700">
            Sign Out
          </Button>
        ) : (
          <Button onClick={handleSignIn} className="bg-blue-500 hover:bg-blue-600">
            Sign In
          </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="p-6">
        {user ? (
          <>
            <h2 className="text-xl font-semibold">Welcome, {user.displayName}</h2>
            
            {/* Generic File Upload Section */}
            <div className="mt-6">
              <label className="block text-gray-700 font-bold mb-2">Upload File to IPFS:</label>
              <input type="file" onChange={handleFileChange} className="mb-2" />
              <Button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload File"}
              </Button>
            </div>

            {ipfsHash && (
              <div className="mt-4 p-4 bg-white shadow rounded">
                <p className="font-semibold">Uploaded File Hash:</p>
                <p className="text-sm break-words">{ipfsHash}</p>
                <p className="mt-2 text-sm">
                  <a 
                    href={`https://gateway.pinata.cloud/ipfs/${ipfsHash}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View on IPFS
                  </a>
                </p>
              </div>
            )}
            
            {/* Role-Based Content */}
            {role === "Researcher" && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold">Researcher Dashboard</h2>
                <Card className="p-4 mt-2">
                  <p>Researcher-specific features will appear here</p>
                </Card>
              </div>
            )}
          </>
        ) : (
          <div className="text-center p-8">
            <p>Please sign in to access the dashboard.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;