import Header from "@/components/Header/Header";
import JobsList from "@/components/Job/JobList/JobsList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Job Application  - Home Page",
  description: "Home page",
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header  />
      <div className="pt-20"> 
        <JobsList />
      </div>
    </main>
  );
}
