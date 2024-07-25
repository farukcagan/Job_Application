"use client";
import React from "react";
import BasicFilter from "../components/BasicFilter";
import JobsContent from "../components/JobsContent";
import AppliedJobs from "../components/AppliedJobs";

function JobsList() {
  return (
    <div className="relative z-50 w-full">
      <div className="flex">
        <div className="w-3/5">
          <BasicFilter />
          <JobsContent />
        </div>
        <div className="w-2/5">
          <AppliedJobs />
        </div>
      </div>
    </div>
  );
}

export default JobsList;
