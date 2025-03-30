import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function EditProfile() {
  const [profile, setProfile] = useState({ name: "", age: "", bio: "" });
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setProfile(snap.data());
      setLoading(false);
    }
    load();
  }, []);

  const handleSave = async () => {
    const ref = doc(db, "users", auth.currentUser.uid);
    await updateDoc(ref, profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <input value={profile.name} placeholder="Name" onChange={e => setProfile({ ...profile, name: e.target.value })} />
      <input value={profile.age} placeholder="Age" onChange={e => setProfile({ ...profile, age: e.target.value })} />
      <input value={profile.bio} placeholder="Bio" onChange={e => setProfile({ ...profile, bio: e.target.value })} />
      <button onClick={handleSave}>Save</button>
      {saved && <p>✅ Profile saved!</p>}
    </div>
  );
}