"use client"; //tells next.js that this is site has interactive features basically that there is a "Client" that will use the webpage

import React, { useState, useEffect } from 'react'; //import useState which can remember data and useEffect which will run the code as soon as the page loads
import { User, Mail, Phone, MapPin, Globe, Heart, Cake, Edit3, Save, X } from 'lucide-react'; //importing icons from lucide-react library

//creating the main container for the profilePage
export default function ProfilePage() { 
  //the default data
  const initialData = {
    firstName: "Fudail",
    lastName: "Syed",
    email: "fudail.syed@gmail.com",
    phone: "4162003134",
    address: "22 Adrian Crescent",
    country: "Canada",
    hobbies: "Cars, Programming, Circutry",
    favouriteColor: "#bb00ff",
    birthdate: "2003-06-05"
  };

/*the state variables:
user: the actual data being displayed
draft: the data being edited before saving
isEditing: whether the profile is in edit mode or not
*/
  const [user, setUser] = useState(initialData);
  const [draft, setDraft] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  // Effect hook to load persisted data from localStorage when the component mounts
  useEffect(() => {
    const saved = localStorage.getItem('userProfile');
    // If saved data exists, parse the JSON string and update both user and draft states
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed);
      setDraft(parsed);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Derived state to check if today matches the user's birthdate
  // Uses an immediately invoked function expression (IIFE) for clean logic encapsulation
  const isBirthday = (() => {
    const today = new Date();
    // Split the date string (YYYY-MM-DD) into numbers to avoid timezone conversion errors
    const [year, month, day] = user.birthdate.split('-').map(Number);
    // Compare current month (adding 1 because getMonth() is 0-indexed) and day
    return (today.getMonth() + 1 === month) && (today.getDate() === day);
  })();

  // Handlers for button actions
  const handleSave = () => {
    setUser(draft); // Commit the draft changes to the main user state
    localStorage.setItem('userProfile', JSON.stringify(draft)); // Persist the new data to browser storage
    setIsEditing(false); // Exit edit mode
  };

  const handleCancel = () => {
    setDraft(user); // Revert the draft state back to the last saved user state
    setIsEditing(false); // Exit edit mode
  };

  // Dynamic style object to toggle button colors based on the editing state
  const buttonStyle = {
    backgroundColor: isEditing ? draft.favouriteColor : user.favouriteColor,
    color: 'white'
  };

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
      
      {/* Conditionally render the birthday banner if isBirthday is true */}
      {isBirthday && (
        <div className="mb-6 w-full max-w-4xl text-white p-5 rounded-2xl shadow-lg flex items-center justify-center gap-3 animate-bounce"
             style={{ backgroundColor: user.favouriteColor }}>
          <Cake size={28} /> 
          <span className="font-bold text-xl">Happy Birthday, {user.firstName}! 🎂</span>
        </div>
      )}

      {/* Main card container */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* Header background with dynamic color transition */}
        <div className="h-32 w-full relative transition-colors duration-500" 
             style={{ backgroundColor: isEditing ? draft.favouriteColor : user.favouriteColor }}>
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-2xl bg-white shadow-lg flex items-center justify-center border-4 border-white text-gray-400">
              <User size={48} />
            </div>
          </div>
        </div>

        {/* Profile info header containing name and action buttons */}
        <div className="pt-16 px-8 pb-6 flex justify-between items-end border-b border-gray-50">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{user.firstName} {user.lastName}</h1>
            <p className="text-gray-500 font-medium italic">
              {isEditing ? "Editing Profile..." : "Software Developer"}
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Conditional rendering for buttons: Edit button vs Save/Cancel buttons */}
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold hover:opacity-90 transition"
                      style={buttonStyle}>
                <Edit3 size={18} /> Edit Profile
              </button>
            ) : (
              <>
                <button onClick={handleCancel} className="flex items-center gap-2 px-6 py-3 bg-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-300 transition">
                  <X size={18} /> Cancel
                </button>
                <button onClick={handleSave} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold hover:opacity-90 transition" style={buttonStyle}>
                  <Save size={18} /> Save
                </button>
              </>
            )}
          </div>
        </div>

        {/* Grid layout for profile fields using the reusable Field component */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <Field label="First Name" value={draft.firstName} isEditing={isEditing} icon={<User />} 
                 onChange={(val: any) => setDraft({...draft, firstName: val})} />
          <Field label="Last Name" value={draft.lastName} isEditing={isEditing} icon={<User />} 
                 onChange={(val: any) => setDraft({...draft, lastName: val})} />
          <Field label="Email" value={draft.email} isEditing={isEditing} icon={<Mail />} 
                 onChange={(val: any) => setDraft({...draft, email: val})} />
          <Field label="Phone" value={draft.phone} isEditing={isEditing} icon={<Phone />} 
                 onChange={(val: any) => setDraft({...draft, phone: val})} />
          <Field label="Address" value={draft.address} isEditing={isEditing} icon={<MapPin />} 
                 onChange={(val: any) => setDraft({...draft, address: val})} />
          <Field label="Country" value={draft.country} isEditing={isEditing} icon={<Globe />} 
                 onChange={(val: any) => setDraft({...draft, country: val})} />
          <Field label="Birthdate" value={draft.birthdate} type="date" isEditing={isEditing} icon={<Cake />} 
                 onChange={(val: any) => setDraft({...draft, birthdate: val})} />
          <Field label="Hobbies" value={draft.hobbies} isEditing={isEditing} icon={<Heart />} 
                 onChange={(val: any) => setDraft({...draft, hobbies: val})} />

          {/* Custom color picker input field */}
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400 font-bold uppercase">favourite Color</label>
            {isEditing ? (
              <div className="flex items-center gap-4">
                <input type="color" className="h-10 w-20 rounded cursor-pointer border-2 border-gray-200"
                       value={draft.favouriteColor}
                       onChange={(e) => setDraft({...draft, favouriteColor: e.target.value})} />
                <span className="text-sm text-gray-500 font-mono">{draft.favouriteColor}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg border border-gray-100 w-fit">
                 <div className="w-6 h-6 rounded-full border shadow-sm" style={{backgroundColor: user.favouriteColor}} />
                 <span className="text-gray-700 font-medium uppercase text-sm">{user.favouriteColor}</span>
              </div>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}

// Reusable Field component to handle conditional rendering of Input vs Text
function Field({ label, value, isEditing, onChange, icon, type = "text" }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg">
        {React.cloneElement(icon, { size: 20 })}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mb-1">{label}</p>
        {isEditing ? (
          // Render input field during edit mode
          <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
                 className="w-full border-b-2 border-indigo-200 focus:border-indigo-500 outline-none py-1 bg-transparent transition-colors text-gray-800" />
        ) : (
          // Render static text during view mode
          <p className="text-gray-700 font-medium min-h-[1.5rem]">{value}</p>
        )}
      </div>
    </div>
  );
}