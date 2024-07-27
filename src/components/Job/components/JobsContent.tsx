import apiCall from "@/utils/ApiCall";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
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

const JobsContent: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const router: any = useRouter();

  const showAlert = (title: string, text: string, icon: "success" | "error") => {
    Swal.fire({ toast: true, position: "top-end", icon, title: text, showConfirmButton: false, timer: 3000, timerProgressBar: true });
  };

  const fetchJobs = async () => {
    try {
      const { data } = await apiCall("GET", "/jobs", router, { params: { page, perPage } });
      setJobs(data.data);
      setTotalJobs(data.meta.total);
    } catch (error) {
      showAlert("Error!", (error as Error).message || "An error occurred while fetching jobs", "error");
    }
  };

  const applyJob = async (id: string) => {
    try {
      const response = await apiCall("POST", `/jobs/${id}/apply`, router);
      if (response.status === 200) {
        showAlert("Success!", response.data.message || "Successfully applied for the job", "success");
        setIsModalOpen(false);
      }
    } catch (error) {
      showAlert("Error!", (error as Error).message || "An error occurred while applying for the job", "error");
    }
  };

  const withdrawJob = async (id: string) => {
    const result = await Swal.fire({
      title: "Emin misiniz?",
      text: "Bu iş başvurusunu gerçekten geri çekmek mi istiyorsunuz?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await apiCall("POST", `/jobs/${id}/withdraw`, router);
        if (response.status === 200) {
          showAlert("Success!", response.data.message, "success");
          setIsModalOpen(false);
        }
      } catch (error) {
        showAlert("Error!", (error as Error).message || "An error occurred while withdrawing from the job", "error");
      }
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

  const handlePerPageChange = (option: any) => {
    setPerPage(option.value);
    setPage(1);
  };

  const openModal = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleApply = () => {
    if (selectedJob) applyJob(selectedJob.id);
  };

  return (
    <div className="lg:p-2">
      {isModalOpen && selectedJob && (
        <ApplyJobModal job={selectedJob} onClose={closeModal} onApply={handleApply} />
      )}
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-full sm:w-2/3">
                <h2 className="text-xl font-bold mb-2">{job.companyName} - {job.name}</h2>
                <p className="text-gray-700 mb-4">{job.description}</p>
                <div className="text-sm text-gray-500">
                  <p><strong>Location:</strong> {job.location}</p>
                  <p><strong>Salary:</strong> ${job.salary}</p>
                </div>
              </div>
              <div className="mt-1 w-full sm:w-1/3 flex sm:flex-col gap-2 sm:gap-4 justify-end">
                <button onClick={() => openModal(job)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Detail</button>
                <button onClick={() => withdrawJob(job.id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">Withdraw</button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {job.keywords.map((keyword, index) => (
                <span key={index} className="bg-gray-200 text-gray-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{keyword}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between gap-4 items-center mt-2">
        <div className="flex justify-between gap-4 items-center">
          <button disabled={page <= 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50">Previous</button>
          <span>Page {page} of {totalPages}</span>
          <button disabled={page >= totalPages} onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:opacity-50">Next</button>
        </div>
        <div className="flex gap-4 min-w-24">
          <span className="self-center">Show</span>
          <Select
            options={perPageOptions}
            onChange={handlePerPageChange}
            menuPlacement="top"
            defaultValue={perPageOptions.find(option => option.value === perPage)}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsContent;
