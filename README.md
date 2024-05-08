# Chris Henry's CTA technical assessment

Hello! and welcome to my tech assessment prepared for the Community Tech Alliance

Here's some steps to get started.

# Docker

Install [Docker](https://www.docker.com/). The easiest option for installing Docker is [Docker for Mac](https://docs.docker.com/docker-for-mac/). This will provide Docker for Mac, `docker-compose` and `docker-machine`. In general, we should prefer Docker for Mac for local development.

Once installed, click on the gear icon to navigate to Preferences.

* Click on General, and select VirtioFS. This should also Select `Use Virtualization Fraemwork`
* Click on 'Resources' and then increase 'Memory' to 6.00GB and 'Swap' to 2GB. Make sure to click 'Apply' to save changes.

NB: the above probably isn't strictly neccessary for this project, but this is some boilerplate I've developed that's been useful for larger projects.

NB2: This project was built on a 2022 Macbook Pro with an M2 chip. Due to time restrictions, I did not build multi-platform images. So folx on other platforms may experience issues. Should you experience errors related to platform, rm the package-lock.json, comment, the COPY command in frontend/Dockerfile, and try again.

## Use docker-compose to run services.

We're ready to spin our containers up!

```bash
docker-compose up -d && docker-compose logs -f
```

This might take a moment. Docker will pull the latest images onto your machine and run them. If all goes well, logs should look like this;

```
backend-1   | INFO:     Waiting for application startup.
backend-1   | INFO:     Application startup complete.
frontend-1  |
frontend-1  |   VITE v5.2.11  ready in 243 ms
frontend-1  |
frontend-1  |   ➜  Local:   http://localhost:5173/
frontend-1  |   ➜  Network: http://192.168.176.3:5173/
```

To view the project, navigate to [http://localhost](http://localhost)

This project uses standard ports for convience, but this also increases the likelihood of collision. If the project emits an error along the lines of "Port is already allocated", the service using that port will need to be brought down first.

If you need to get back to your shell, just `Ctrl + C`, the containers will continue to run.

Run `docker-compose ps` to list running containers.

# Project overview

This project takes on both the frontend and backend portions of the Engineering-Coding Walkthrough task. There was significant overlap with research on new React component libraries for my current role, and this project served as an excellent test bed.

All told, this project took me around 5 hours. There was some extra time spent on research and some false starts with React component libs that didn't meet my needs.

## Backend notes

Last week, I sent an email to Meghan with a few questions on the task. The obvious blocker was the lack of related JSON document referenced in the task. Her response indicated I should move forward in any way I saw fit. So I generated a file based on the provided structure.

To keep within time constraints, the calculations for determining primary winners were simplified down to a national plurality, which clearly isn't correct. However, the winners.py could be updated with per-state rules (plurality, majority, top-two, and Louisana's top-two+runoff). Additionally, after determining the year this calculation is made, delegate count data would need to be sourced to inform each party's overall winner. However, as a believer in end-to-end MVPs, this should suffice for our purposes.

## Frontend notes

The brief implied a form "submission" on field change. However, I felt this was a bit awkward, as onChange doesn't fire if the desired field is also the initial value. So I added a submit button. This also allowed for a few more niceties, like a button that grabs the current user's IP. I found this quite helpful, as IPs aren't the kind of thing I keep memorized or laying about. ;)
