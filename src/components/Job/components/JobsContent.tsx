import React from 'react';

interface Job {
  companyName?: string;
  jobName?: string;
  description?: string;
  location?: string;
  salary?: string;
}

const exampleJobs: Job[] = [
  {
    companyName: 'Company A',
    jobName: 'Job A',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
  {
    companyName: 'Company B',
    jobName: 'Job B',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
  {
    companyName: 'Company C',
    jobName: 'Job C',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  }, {
    companyName: 'Company B',
    jobName: 'Job B',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
  {
    companyName: 'Company C',
    jobName: 'Job C',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  }, {
    companyName: 'Company B',
    jobName: 'Job B',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
  {
    companyName: 'Company C',
    jobName: 'Job C',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  }, {
    companyName: 'Company B',
    jobName: 'Job B',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
  {
    companyName: 'Company C',
    jobName: 'Job C',
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate sed possimus asperiores neque optio quas. Aliquam reiciendis autem quo totam.',
    location: 'Irving',
    salary: '2000$',
  },
];

const JobsContent: React.FC = () => {
  return (
    <div className="max-h-[550px] overflow-y-auto space-y-4 p-2">
      {exampleJobs.map((job, index) => (
        <div key={index} className="card bg-white border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">{job.companyName} - {job.jobName}</h2>
          <p className="text-gray-700 mb-4">{job.description}</p>
          <div className="text-sm text-gray-500">
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Salary:</strong> {job.salary}</p>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Detail
            </button>
            <button className="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors">
              Withdraw
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobsContent;
