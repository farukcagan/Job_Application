"use client";
import React, { useEffect, useState, useCallback } from "react";
import BasicFilter from "../components/BasicFilter";
import JobsContent from "../components/JobsContent";
import AppliedJobs from "../components/AppliedJobs";
import apiCall from "@/utils/ApiCall";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

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

const JobsList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalJobs, setTotalJobs] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router: any = useRouter();

  const showAlert = useCallback(
    (title: string, text: string, icon: "success" | "error") => {
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
      const { data } = await apiCall("GET", "/jobs", router, {
        params: { page, perPage },
      });
      setJobs(data.data);
      setTotalJobs(data.meta.total);
    } catch (error) {
      showAlert(
        "Error!",
        (error as Error).message || "An error occurred while fetching jobs",
        "error"
      );
    }
  }, [page, perPage, router, showAlert]);

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
        }
      } catch (error) {
        showAlert(
          "Error!",
          (error as Error).message ||
            "An error occurred while applying for the job",
          "error"
        );
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
        confirmButtonText: "Evet!",
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

  return (
    <div className="relative z-50 w-full">
      <div className="flex">
        <div className="w-3/5">
          <BasicFilter />
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
            handleApply={handleApply}
            handleWithDraw={handleWithDraw}
          />
        </div>
        <div className="w-2/5">
          <AppliedJobs appliedJobs={appliedJobs} user={user} />
        </div>
      </div>
    </div>
  );
};

export default JobsList;
