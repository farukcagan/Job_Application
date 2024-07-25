import apiCall from "@/utils/ApiCall";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import { useRouter } from "next/navigation";

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

const JobsContent: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const router:any = useRouter();

  const fetchJobs = async () => {
    try {
      const response:any = await apiCall("GET", "/jobs", router, {
        params: { page, perPage },
      });
      console.log(response);
      setJobs(response.data.data);
      setTotalJobs(response.data.meta.total);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err);

      Swal.fire({
        title: "Error!",
        text: "An error occurred",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, perPage]);

  const totalPages = Math.ceil(totalJobs / perPage);

  const perPageOptions = [
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 20, label: "20" },
    { value: 50, label: "50" },
  ];

  const handlePerPageChange = (selectedOption: any) => {
    setPerPage(selectedOption.value);
    setPage(1);
  };

  return (
    <div className="space-y-4 p-2">
      <div className="max-h-[500px] overflow-y-auto space-y-4 p-2">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="card bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-5">
              <div className="w-2/3">
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
                  <p>
                    <strong>Posted on:</strong>{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="mt-1 w-1/3 flex h-10 justify-end">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Detail
                </button>
                <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
                  Withdraw
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
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
      <div className="flex justify-between gap-4 items-center mt-10">
        <div className="flex justify-between gap-4 items-center">
          <button
            disabled={page <= 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
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
