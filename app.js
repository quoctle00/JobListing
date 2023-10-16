document.addEventListener("DOMContentLoaded", function () {
    const jobListingsElement = document.getElementById("jobListings");
    const titleFilterInput = document.getElementById("titleFilter");
    const locationFilterInput = document.getElementById("locationFilter");
    const applyFiltersButton = document.getElementById("applyFilters");

    let jobListings = []; // Initialize an empty array to store job listings

    fetch("jobs.json")
        .then((response) => response.json())
        .then((data) => {
            jobListings = data; // Store the job listings in the array

            // Populate the job listings on initial page load
            populateJobListings(jobListings);

            applyFiltersButton.addEventListener("click", applyFilters);

            function populateJobListings(listings) {
                jobListingsElement.innerHTML = ""; // Clear existing job listings

                listings.forEach((job) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `
                        <h3>${job.title}</h3>
                        <p>Company: ${job.company}</p>
                        <p>Location: ${job.location}</p>
                        <p>Salary: ${job.salary}</p>
                        <p>Description: ${job.description}</p>
                        <a href="#">Apply Now</a>
                    `;
                    jobListingsElement.appendChild(listItem);
                });
            }

            function applyFilters() {
                const titleFilter = titleFilterInput.value.toLowerCase();
                const locationFilter = locationFilterInput.value.toLowerCase();

                const filteredJobListings = jobListings.filter((job) => {
                    const titleMatch = job.title.toLowerCase().includes(titleFilter);
                    const locationMatch = job.location.toLowerCase().includes(locationFilter);
                    return titleMatch && locationMatch;
                });

                populateJobListings(filteredJobListings); // Populate the HTML with filtered job listings
            }
        })
        .catch((error) => {
            console.error("Error fetching job data:", error);
        });

        
});
