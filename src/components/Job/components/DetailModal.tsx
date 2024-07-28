import React from "react";

interface Job {
  companyName: string;
  name: string;
  createdAt: string;
  location: string;
  keywords: string[];
  salary: number;
  description: string;
}

interface ApplyJobModalProps {
  job: Job;
  onClose: () => void;
  onApply: () => void;
  isLoading: boolean;
}

const ApplyJobModal: React.FC<ApplyJobModalProps> = ({
  job,
  onClose,
  onApply,
  isLoading,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Apply Job</h2>
        <div className="space-y-3">
          <div className="text-gray-700">
            <strong>Company Name:</strong> {job.companyName}
          </div>
          <div className="text-gray-700">
            <strong>Job Name:</strong> {job.name}
          </div>
          <div className="text-gray-700">
            <strong>Created At:</strong> {job.createdAt}
          </div>
          <div className="text-gray-700">
            <strong>Location:</strong> {job.location}
          </div>
          <div className="text-gray-700">
            <strong>Keywords:</strong>{" "}
            <div className="flex flex-wrap gap-2 mt-1">
              {job.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div className="text-gray-700">
            <strong>Salary:</strong> ${job.salary}
          </div>
          <div className="text-gray-700">
            <strong>Job Description:</strong> {job.description}
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
          <button
            onClick={onApply}
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            {isLoading ? "Applying..." : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobModal;
