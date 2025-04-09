document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const content = document.getElementById('content');
    const progressBar = document.querySelector('.progress');
    const developerName = document.getElementById('developerName');
    const dashboard = document.querySelector('.dashboard');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const nameContainer = document.querySelector('.name-container');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    const header = document.querySelector('header'); // Make sure 'header' is selected
    const skillProgressBars = document.querySelectorAll('#skills .progress-fill'); // Select all skill progress bars

    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.style.display = 'none';
                content.classList.remove('hidden');

                setTimeout(() => {
                    developerName.classList.add('move');
                    developerName.offsetWidth;

                    setTimeout(() => {
                        content.style.opacity = 1;
                        setTimeout(() => {
                            dashboard.classList.add('show');
                            // Trigger skill bar animation after the dashboard is shown
                            skillProgressBars.forEach(bar => {
                                const progressValue = bar.getAttribute('data-progress');
                                setTimeout(() => {
                                    bar.style.width = progressValue + '%';
                                }, 100); // Add a small delay for each to start
                            });
                        }, 1000);
                    }, 100);

                }, 10);

                document.body.style.overflow = 'auto';
                document.body.style.cursor = 'none';
                createCursor();
            }, 500);
        }
    }, 20);

    function createCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    }

    if (hamburgerMenu && mobileNav) {
        hamburgerMenu.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            hamburgerMenu.classList.toggle('open'); // Optional: Add open class to hamburger for animation
        });
    }

    nameContainer.addEventListener('mouseenter', () => {
        dropdownMenu.classList.add('show');
    });

    header.addEventListener('mouseleave', (event) => {
        // Check if the mouse is still within the header bounds
        const isInsideHeader = header.contains(event.relatedTarget);
        if (!isInsideHeader) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Optional: Close on click outside
    document.addEventListener('click', (event) => {
        if (!nameContainer.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    const toggleSwitch = document.querySelector(".switch input");
    const body = document.body;

    // Load saved theme preference from localStorage
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        body.classList.add("light-theme");
        toggleSwitch.checked = true;
    }

    // Toggle theme on switch change
    toggleSwitch.addEventListener("change", () => {
        if (toggleSwitch.checked) {
            body.classList.add("light-theme");
            localStorage.setItem("theme", "light");
        } else {
            body.classList.remove("light-theme");
            localStorage.setItem("theme", "dark");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inputs = document.querySelectorAll("input, textarea");

    // Input field effects
    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            input.style.borderLeft = "4px solid #ffd700"; // Gold border effect
        });
        input.addEventListener("blur", () => {
            if (input.checkValidity()) {
                input.style.borderLeft = "4px solid #00ff99"; // Green for valid
            } else {
                input.style.borderLeft = "4px solid #ff3333"; // Red for invalid
            }
        });
    });

    // Form submit animation
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Button Animation
        const button = form.querySelector("button");
        button.innerHTML = "Sending...";
        button.style.background = "#ffd700";
        button.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.7)";

        setTimeout(() => {
            button.innerHTML = "Sent! ✅";
            button.style.background = "#00ff99";
            button.style.boxShadow = "0 0 15px rgba(0, 255, 153, 0.7)";
        }, 2000);

        // Actually Submit the Form
        setTimeout(() => {
            form.submit();
        }, 3000)
    });
});