"use client";
import apiCall from "@/utils/ApiCall";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Select from "react-select";
import Swal from "sweetalert2";
import AppliedJobs from "../components/AppliedJobs";
import JobsContent from "../components/JobsContent";
import { debounce } from "lodash";

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

interface User {
  appliedJobs: string[];
  profileImage: string;
  id: string;
  email: string;
}

interface Params {
  page: number;
  perPage: number;
  search?: {
    field: string;
    query: string;
  };
  orderBy?: {
    field: string;
    direction: "asc" | "desc";
  };
}

const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [searchField, setSearchField] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderBy, setOrderBy] = useState<string>("salary");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router: any = useRouter();

  const showAlert = useCallback(
    (title: string, text: string, icon: "success" | "error" | "warning") => {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon,
        title: text,
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    },
    []
  );

  const fetchJobs = useCallback(async () => {
    try {
      const params: Params = {
        page,
        perPage,
      };

      params.orderBy = {
        field: "salary",
        direction: order,
      };

      if (searchQuery !== "" && searchField !== "") {
        params.search = {
          field: searchField,
          query: searchQuery,
        };
      }

      const { data } = await apiCall("GET", "/jobs", router, { params });
      setJobs(data.data);
      setTotalJobs(data.meta.total);
    } catch (error) {
      showAlert(
        "Error!",
        (error as Error).message || "An error occurred while fetching jobs",
        "error"
      );
    }
  }, [page, perPage, searchField, searchQuery, order]);

  const debouncedFetchJobs = useCallback(
    debounce((field, query) => {
      setSearchField(field);
      setSearchQuery(query);
      fetchJobs();
    }, 500),
    [fetchJobs]
  );

  const userDetails = useCallback(async () => {
    try {
      const { data } = await apiCall("GET", "/user", router);
      setUser(data);
    } catch (error) {
      showAlert(
        "Error!",
        (error as Error).message ||
          "An error occurred while fetching user details",
        "error"
      );
    }
  }, [router, showAlert]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  useEffect(() => {
    userDetails();
  }, [userDetails]);

  const totalPages = Math.ceil(totalJobs / perPage);

  const handlePerPageChange = (option: { value: number }) => {
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

  const handleApply = async () => {
    setIsLoading(true);
    if (selectedJob) {
      if (user?.appliedJobs.includes(selectedJob.id)) {
        showAlert("Error!", "Bu işe zaten başvuru yaptınız.", "error");
        closeModal();
        return;
      }
      try {
        const response = await apiCall(
          "POST",
          `/jobs/${selectedJob.id}/apply`,
          router
        );
        if (response.status === 200) {
          userDetails();
          showAlert(
            "Success!",
            response.data.message || "Successfully applied for the job",
            "success"
          );
          closeModal();
          setIsLoading(false);
        }
      } catch (error) {
        showAlert(
          "Error!",
          (error as Error).message ||
            "An error occurred while applying for the job",
          "error"
        );
        closeModal();
        setIsLoading(false);
      }
    }
  };

  const handleWithDraw = async (jobId: string) => {
    try {
      const result = await Swal.fire({
        text: "İş başvurunuz geri alınacaktır!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonColor: "#3085d6",
        cancelButtonText: "İptal",
        confirmButtonText: "Geri al",
      });

      if (result.isConfirmed) {
        const response = await apiCall(
          "POST",
          `/jobs/${jobId}/withdraw`,
          router
        );
        if (response.status === 200) {
          userDetails();
          showAlert(
            "Success!",
            response.data.message || "Successfully withdrew application",
            "success"
          );
        }
      }
    } catch (error) {
      showAlert(
        "Error!",
        (error as Error).message ||
          "An error occurred while withdrawing application",
        "error"
      );
    }
  };

  const getAppliedJobs = useCallback(async () => {
    if (user) {
      const jobsPromises = user.appliedJobs.map(async (jobId: string) => {
        try {
          const { data } = await apiCall("GET", `/jobs/${jobId}`, router);
          return data;
        } catch (error) {
          showAlert(
            "Error!",
            (error as Error).message ||
              "An error occurred while fetching applied jobs",
            "error"
          );
        }
      });

      const jobsData = await Promise.all(jobsPromises);
      setAppliedJobs(jobsData.filter((job) => job));
    }
  }, [user, router, showAlert]);

  useEffect(() => {
    getAppliedJobs();
  }, [user, getAppliedJobs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedFetchJobs(searchField, e.target.value);
  };

  const handleSearchClick = () => {
    fetchJobs();
  };

  const options = [
    { value: "name", label: "Name" },
    { value: "companyName", label: "Company Name" },
    { value: "location", label: "Location" },
    { value: "salary", label: "Salary" },
  ];

  return (
    <div className="relative z-50 w-full">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5">
          <div className="p-2">
            <div className="flex flex-col lg:flex-row gap-4 bg-white p-4 rounded-md shadow-md">
              <div className="flex-1 self-center">
                <span className="text-md self-center font-semibold">
                  Basic Filter
                </span>
              </div>
              <div className="flex-1">
                <Select
                  options={[
                    { value: "asc", label: "maaşa göre artan" },
                    { value: "desc", label: "maaşa göre azalan" },
                  ]}
                  className="w-full"
                  classNamePrefix="select"
                  defaultValue={{
                    value: "",
                    label: "sıralama türü",
                  }}
                  onChange={(option: { value: string; label: string } | null) =>
                    setOrder((option?.value as "desc" | "asc") || "asc")
                  }
                />
              </div>
              <div className="flex-1">
                <Select
                  options={options}
                  className="w-full"
                  classNamePrefix="select"
                  defaultValue={{
                    value: "",
                    label: "Arama alanı",
                  }}
                  onChange={(option) => setSearchField(option?.value || "")}
                />
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="border border-gray-300 rounded-md py-2 px-4 pl-10 w-full"
                  onChange={handleSearchChange}
                  ref={searchInputRef}
                />
                <FiSearch
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  onClick={handleSearchClick}
                />
              </div>
            </div>
          </div>
          <JobsContent
            jobs={jobs}
            page={page}
            perPage={perPage}
            totalPages={totalPages}
            setPage={setPage}
            handlePerPageChange={handlePerPageChange}
            openModal={openModal}
            closeModal={closeModal}
            isModalOpen={isModalOpen}
            selectedJob={selectedJob}
            appliedJobs={user?.appliedJobs || []}
            handleApply={handleApply}
            handleWithDraw={handleWithDraw}
            isLoading={isLoading}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <AppliedJobs appliedJobs={appliedJobs} user={user} />
        </div>
      </div>
    </div>
  );
};

export default JobsList;
