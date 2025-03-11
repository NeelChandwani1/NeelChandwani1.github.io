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
const GITHUB_USERNAME = 'NeelChandwani1'; 

// Fetch GitHub contributions data
async function fetchGitHubContributions() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`);
        const data = await response.json();

        // Filter PushEvents (code contributions)
        const contributions = data.filter(event => event.type === 'PushEvent').length;

        // Render the chart
        renderChart(contributions);
    } catch (error) {
        console.error('Error fetching GitHub data:', error);
    }
}

// Render the chart using Chart.js
function renderChart(contributions) {
    const ctx = document.getElementById('githubChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['GitHub Contributions'],
            datasets: [{
                label: 'Contributions',
                data: [contributions],
                backgroundColor: 'rgba(255, 111, 97, 0.2)',
                borderColor: 'rgba(255, 111, 97, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Number of Contributions'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'GitHub Activity'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `GitHub Contributions for ${GITHUB_USERNAME}`
                }
            }
        }
    });
}

// Initialize the tracker
fetchGitHubContributions();

// Form submission
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for reaching out! I’ll get back to you soon.');
});