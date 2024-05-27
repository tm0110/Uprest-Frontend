# Uprest-Frontend

Frontend for Uprest-Server in React.

# Requirements

npm is required for installing necessary packages, as well as running the application.

Uprest-Frontend is meant to run together with Uprest-Server.

# Building & Running

		cd Uprest-Frontend
		npm install react react-router
		npm start

# Configuration & Reverse Proxy (nginx)

Uprest-Frontend can be run behind a reverse proxy (recommended). Add the following to your nginx
configuration:

		location / {
			proxy_pass http://127.0.0.1:3000;
		}

Note that the base URI of Uprest-Frontend must be /, meaning the root.

The URI prefix to the Uprest-Server backend is set to http://localhost/uprest by default. This can
be changed in src/App.js, line 6:

		let prefix = "http://localhost/uprest";
