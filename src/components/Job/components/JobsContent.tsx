import React from "react";
import Select from "react-select";
import ApplyJobModal from "./DetailModal";

interface Job {
  companyName: string;
  keywords: string[];
  id: string;
  description: string;
  name: string;
  createdAt: string;
  location: string;
  salary: number;
}

interface JobsContentProps {
  jobs: Job[];
  page: number;
  perPage: number;
  totalPages: number;
  setPage: (page: number) => void;
  handlePerPageChange: (option: any) => void;
  openModal: (job: Job) => void;
  closeModal: () => void;
  isModalOpen: boolean;
  selectedJob: Job | null;
  handleApply: () => void;
  handleWithDraw: (jobId: string) => void;
  appliedJobs: string[];
  isLoading: boolean;
}

const JobsContent: React.FC<JobsContentProps> = ({
  jobs,
  page,
  perPage,
  totalPages,
  setPage,
  handlePerPageChange,
  openModal,
  closeModal,
  isModalOpen,
  selectedJob,
  handleApply,
  handleWithDraw,
  appliedJobs,
  isLoading,
}) => {
  const perPageOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
  ];

  return (
    <div className="lg:p-2">
      {isModalOpen && selectedJob && (
        <ApplyJobModal
          job={selectedJob}
          onClose={closeModal}
          onApply={handleApply}
          isLoading={isLoading}
        />
      )}
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-2/3">
                <h2 className="text-xl font-bold mb-2">
                  {job.companyName} - {job.name}
                </h2>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p>
                    <strong>Salary:</strong> ${job.salary}
                  </p>
                </div>
              </div>
              <div className="mt-1 w-full sm:w-1/3 flex sm:flex-col gap-2 sm:gap-4 justify-end">
                <button
                  onClick={() => openModal(job)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Detail
                </button>
                {appliedJobs.includes(job.id) && (
                  <button
                    onClick={() => handleWithDraw(job.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Withdraw
                  </button>
                )}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-2">
        <div className="flex justify-between gap-4 items-center">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="flex gap-4 min-w-24">
          <span className="self-center">Show</span>
          <Select
            options={perPageOptions}
            onChange={handlePerPageChange}
            menuPlacement="top"
            defaultValue={perPageOptions.find(
              (option) => option.value === perPage
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsContent;
