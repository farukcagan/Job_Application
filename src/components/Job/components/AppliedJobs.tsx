import Image from "next/image";
import React from "react";

interface Job {
  name: string;
  companyName: string;
  location: string;
}

interface AppliedJobsProps {
  appliedJobs: Job[];
  user: {
    profileImage: string;
    email: string;
  } | null;
}

const AppliedJobs: React.FC<AppliedJobsProps> = ({ appliedJobs, user }) => {
  console.log(appliedJobs);
  return (
    <div className="p-4 mt-2 mr-4  ml-4 bg-white rounded-md space-y-6 text-center">
      <div className="items-center">
        <div className="flex justify-center mb-5">
          <Image
            src={user?.profileImage?.replace(/"/g, "") || "/images/logo.png"}
            alt="Profile Picture"
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <div>
          <h2 className="text-sm font-bold">{user?.email?.replace(/"/g, "")}</h2>
        </div>
        <div className="mt-6">
          <span className="text-xl font-bold">Applied Jobs</span>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto cursor-pointer space-y-4 p-2">
        {appliedJobs.map((job, index) => (
          <div
            key={index}
            className="card bg-green-50 border p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-lg font-semibold mb-2">{job.name}</h3>
            <p className="text-gray-700 mb-2">
              Company Name: {job.companyName}
            </p>
            <p className="text-gray-500">Location: {job.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedJobs;
