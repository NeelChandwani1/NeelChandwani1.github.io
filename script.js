// Initialize Particles.js
particlesJS.load('particles-js', 'particles.json', function() {
    console.log('Particles.js loaded!');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// script.js
// script.js
const GITHUB_USERNAME = 'NeelChandwani1'; // Replace with your GitHub username
const GITHUB_TOKEN = 'your-github-token'; // Replace with a GitHub personal access token

// GraphQL query to fetch contribution data
const query = `
    query {
        user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
                contributionCalendar {
                    totalContributions
                    weeks {
                        contributionDays {
                            date
                            contributionCount
                        }
                    }
                }
            }
        }
    }
`;

// Fetch GitHub contribution data
async function fetchGitHubContributions() {
    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GITHUB_TOKEN}`
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();
        const weeks = data.data.user.contributionsCollection.contributionCalendar.weeks;

        // Flatten the contribution days into a single array
        const contributions = weeks.flatMap(week => week.contributionDays);

        // Render the heatmap
        renderHeatmap(contributions);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

// Render the heatmap using D3.js
function renderHeatmap(contributions) {
    const width = 800; // Width of the heatmap
    const height = 120; // Height of the heatmap
    const cellSize = 15; // Size of each square in the heatmap

    // Create an SVG element
    const svg = d3.select('#heatmap')
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create a color scale for the heatmap
    const colorScale = d3.scaleLinear()
        .domain([0, d3.max(contributions, d => d.contributionCount)])
        .range(['#ebedf0', '#216e39']); // GitHub's color scheme

    // Create the heatmap squares
    svg.selectAll('rect')
        .data(contributions)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i % 7) * cellSize) // 7 days in a week
        .attr('y', (d, i) => Math.floor(i / 7) * cellSize) // Rows for weeks
        .attr('width', cellSize - 2) // Add spacing between squares
        .attr('height', cellSize - 2)
        .attr('fill', d => colorScale(d.contributionCount))
        .append('title') // Tooltip to show contribution count and date
        .text(d => `${d.contributionCount} contributions on ${d.date}`);
}

// Initialize the tracker
fetchGitHubContributions();

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I’ll get back to you soon.');
});