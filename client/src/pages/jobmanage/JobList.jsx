import React, { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/job/get");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading jobs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div style={{ padding: "60px" }}>
      <h3 className="text-center font-bold text-3xl mb-10">Recent Done Jobs</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Job ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Bin ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Proof Image URL
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Collected At
            </th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.jobId}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {job.jobId}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {job.binId}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <a href={job.proofImageUrl}>View Image</a>
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {new Date(job.collectedAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
