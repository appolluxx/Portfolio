document.addEventListener('DOMContentLoaded', () => {
    const cmdInput = document.getElementById('cmd-input');
    const outputArea = document.getElementById('output-area');
    const terminalBody = document.querySelector('.terminal-body');
    const navLinks = document.querySelectorAll('.nav-list a');

    // Keep focus on input
    document.addEventListener('click', (e) => {
        // Don't focus if clicking outside the app or selecting text
        if (window.getSelection().toString() === '') {
            cmdInput.focus();
        }
    });

    const commands = {
'/about': `
[Name]: Chaiyachet Wiranton (Prem)
[Role]: Student
[Location]: Bangkok, Thailand
-----------------------------------------------------------
I am a high school student at Surasakmontree School with a passion for 
building technology that solves social issues. From AI-powered policy 
simulators to sustainability platforms, I enjoy turning complex 
problems into elegant digital experiences.`,

    '/work': `
Selected Projects:
-----------------------------------------------------------
1. [NayoBye] - AI-powered policy simulation and impact tool.
2. [SaveRaks] - Gamified sustainability platform for schools.
3. [Policy Playground] - Interactive platform for simulating social impacts.
4. [Roblox Campus] - Digital twin of Surasakmontree School.

Type /project [name] for more details (Coming soon).`,

    '/skills': `
Technical Stack:
-----------------------------------------------------------
[Languages]   : C++, C, JavaScript , HTML5, CSS3, Python, Lua
[Frameworks]  : React, Next.js, Vite
[Tools/Tech]  : Git, GitHub, Roblox Studio, Arduino/Robotics
[Soft Skills] : Social Innovation, Systems Thinking`,

    '/contact': `
Get in Touch:
-----------------------------------------------------------
Email    : jonh.cwv@gmail.com
GitHub   : https://github.com/appolluxx
Tell     : (+66)86-702-8606
Location : Bangkok, Thailand

Feel free to reach out for collaborations or opportunities!`,

    '/help': `
Available Commands:
-----------------------------------------------------------
/about    - Brief introduction of who I am
/work     - Show my featured projects and experiments
/skills   - My technical expertise and tools
/contact  - Ways to reach me or follow my work
/clear    - Clear the terminal screen
/privacy  - View privacy and data policy
/sudo     - ???`,

    '/privacy': `
Privacy Policy:
-----------------------------------------------------------
This site is 100% static. 
- No cookies are used.
- No personal data is collected or stored.
- No tracking scripts (Google Analytics, etc.) are active.
Clean, private, and secure.`,

    '/sudo': `[system] Nice try! But you don't have root privileges here. :)`
    };

    const processCommand = (cmdStr) => {
        const cmd = cmdStr.trim().toLowerCase();
        
        if (!cmd) return;

        if (cmd === '/clear') {
            outputArea.innerHTML = '';
            cmdInput.value = '';
            return;
        }

        let response = '';
        if (commands[cmd]) {
            response = commands[cmd];
        } else {
            response = `Command not found: ${cmd}. Try "/help" for available commands.`;
        }

        // Format the output
        const outputBlock = document.createElement('div');
        outputBlock.className = 'output-block';
        
        const cmdElement = document.createElement('div');
        cmdElement.className = 'output-cmd';
        cmdElement.textContent = `> ${cmd}`;
        
        const contentElement = document.createElement('div');
        contentElement.className = 'output-content';
        
        // Handle newlines
        contentElement.innerHTML = response.replace(/\n/g, '<br>');
        
        outputBlock.appendChild(cmdElement);
        outputBlock.appendChild(contentElement);
        outputArea.appendChild(outputBlock);

        // Scroll to bottom
        setTimeout(() => {
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);

        cmdInput.value = '';
    };

    cmdInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(cmdInput.value);
        }
    });

    // Make nav links clickable commands
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const cmd = e.target.getAttribute('data-cmd');
            cmdInput.value = cmd;
            processCommand(cmd);
        });
    });

    // Make window buttons slightly interactive
    document.querySelector('.close').addEventListener('click', () => {
        document.body.innerHTML = '<div style="color: white; font-family: monospace; display: flex; align-items: center; justify-content: center; height: 100vh;">Session closed. Refresh to restart.</div>';
    });
});
