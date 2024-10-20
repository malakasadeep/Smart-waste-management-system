import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  User,
  Calendar,
  AlertTriangle,
  Edit3,
  X,
  ChevronDown,
  ChevronUp,
  History,
  Plus,
  Eye,
  Save,
  Recycle,
  Truck,
} from "lucide-react";

// Sample data (replace with actual data fetching logic)
const userData = {
  name: "John Doe",
  email: "john@example.com",
  address: "123 Green Street, Eco City",
  garbageLevels: [
    { date: "2024-10-15", general: 75, recycling: 50, organic: 25 },
    { date: "2024-10-08", general: 50, recycling: 30, organic: 60 },
    { date: "2024-10-01", general: 90, recycling: 70, organic: 40 },
  ],
  collectionHistory: [
    { date: "2024-10-14", type: "Regular", weight: "20kg" },
    { date: "2024-10-07", type: "Recycling", weight: "15kg" },
    { date: "2024-09-30", type: "Regular", weight: "22kg" },
  ],
  upcomingCollections: [
    { date: "2024-10-21", type: "Regular" },
    { date: "2024-10-28", type: "Recycling" },
  ],
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  const ProfileSection = ({ title, icon, children }) => (
    <motion.div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
      <h2
        onClick={() => toggleSection(title)}
        className="text-xl font-semibold p-4 bg-green-100 text-green-800 cursor-pointer flex items-center justify-between"
      >
        <span className="flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </span>
        {expandedSection === title ? <ChevronUp /> : <ChevronDown />}
      </h2>
      <AnimatePresence>
        {expandedSection === title && (
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="p-4"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const GarbageTypeBar = ({ type, level, color }) => (
    <div className="flex items-center mb-2">
      <span className="w-24 text-sm">{type}</span>
      <div className="flex-grow bg-gray-200 rounded-full h-4 ml-2">
        <div
          className={`${color} rounded-full h-4`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm">{level}%</span>
    </div>
  );

  const ScheduleModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">
          Schedule Special Collection
        </h3>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
              <option>Regular</option>
              <option>Recycling</option>
              <option>Organic</option>
              <option>Bulk</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowScheduleModal(false)}
              className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-500"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );

  return (
    <div className="bg-green-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="bg-green-600 text-white p-6 rounded-t-lg flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
            <User className="mr-2" /> {userData.name}'s Profile
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-green-500 hover:bg-green-400 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full flex items-center text-sm sm:text-base"
          >
            {isEditing ? (
              <X className="mr-1 sm:mr-2" />
            ) : (
              <Edit3 className="mr-1 sm:mr-2" />
            )}
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Information */}
        <div className="bg-white p-6 rounded-b-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">
            Personal Information
          </h2>
          {isEditing ? (
            <form className="space-y-4">
              <input
                type="text"
                defaultValue={userData.name}
                className="w-full p-2 border border-green-300 rounded"
              />
              <input
                type="email"
                defaultValue={userData.email}
                className="w-full p-2 border border-green-300 rounded"
              />
              <input
                type="text"
                defaultValue={userData.address}
                className="w-full p-2 border border-green-300 rounded"
              />
              <button className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center">
                <Save className="mr-2" /> Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Address:</strong> {userData.address}
              </p>
            </div>
          )}
        </div>

        {/* Garbage Levels */}
        <ProfileSection
          title="Garbage Levels"
          icon={<Trash2 className="mr-2" />}
        >
          {userData.garbageLevels.map((level, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold mb-2">{level.date}</h3>
              <GarbageTypeBar
                type="General"
                level={level.general}
                color="bg-red-500"
              />
              <GarbageTypeBar
                type="Recycling"
                level={level.recycling}
                color="bg-blue-500"
              />
              <GarbageTypeBar
                type="Organic"
                level={level.organic}
                color="bg-green-500"
              />
            </div>
          ))}
        </ProfileSection>

        {/* Collection History */}
        <ProfileSection
          title="Collection History"
          icon={<History className="mr-2" />}
        >
          <table className="w-full">
            <thead>
              <tr className="bg-green-100">
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Type</th>
                <th className="p-2 text-left">Weight</th>
              </tr>
            </thead>
            <tbody>
              {userData.collectionHistory.map((collection, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-green-50" : "bg-white"}
                >
                  <td className="p-2">{collection.date}</td>
                  <td className="p-2">{collection.type}</td>
                  <td className="p-2">{collection.weight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ProfileSection>

        {/* Schedule Special Collections */}
        <ProfileSection
          title="Schedule Special Collections"
          icon={<Calendar className="mr-2" />}
        >
          <div className="space-y-4">
            <h3 className="font-semibold">Upcoming Collections</h3>
            {userData.upcomingCollections.map((collection, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-green-100 p-2 rounded"
              >
                <span>{collection.date}</span>
                <span className="bg-green-600 text-white px-2 py-1 rounded">
                  {collection.type}
                </span>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowScheduleModal(true)}
                className="flex-1 flex items-center justify-center bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg shadow transition duration-300 ease-in-out"
              >
                <Plus className="mr-2" /> Create New Schedule
              </button>
              <button className="flex-1 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg shadow transition duration-300 ease-in-out">
                <Eye className="mr-2" /> View All Schedules
              </button>
            </div>
          </div>
        </ProfileSection>

        {/* Report Bin Status */}
        <ProfileSection
          title="Report Bin Status"
          icon={<AlertTriangle className="mr-2" />}
        >
          <div className="space-y-4">
            <p>
              If you notice any issues with your bins, please report them here.
            </p>
            <button className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded flex items-center">
              <AlertTriangle className="mr-2" /> Report Issue
            </button>
          </div>
        </ProfileSection>

        {/* Delete Account */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <button className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded flex items-center">
            <Trash2 className="mr-2" /> Delete Account
          </button>
        </div>

        {/* Schedule Modal */}
        <AnimatePresence>
          {showScheduleModal && <ScheduleModal />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default UserProfile;
