# Code Obfuscation Detection with Real-Time Collaboration and Messaging

## Project Overview

This project is designed to provide a comprehensive solution for detecting code obfuscation and facilitating real-time collaboration and messaging. It enables users to upload and analyze code files for obfuscation, collaborate with team members, and communicate through a messaging system all in real-time.

## Features

- **Code Obfuscation Detection**: Automatically detects obfuscated code, flagging suspicious sections of code.
- **Real-Time Collaboration**: Multiple users can collaborate on code analysis and share insights instantly.
- **Messaging System**: Built-in chat functionality for seamless communication between collaborators.
- **Role-based Access Control**: Users are assigned roles to control access and functionality.
- **File Upload**: Upload code files for analysis.

## Installation

### Prerequisites

- Nodejs
- MongoDB
- Reactjs

1. Clone the repository:

```bash
  git clone https://github.com/ashraf-g/CODWRTCAM.git
  cd CODWRTCAM
```

2. Install the dependencies:

- For backend and frontend

```bash
  npm install
```

3. Start the server:

- For frontend and backend

```bash
  npm start
```

4. Access the application in your browser at:

```bash
  http://localhost:3000
```

## Usage

### User Authentication

- Register an account to access the platform.
- Users can log in with their credentials (email/username and password).

### Upload Code for Analysis

- Navigate to the "Upload" section and upload your code files.
- The system will automatically analyze the files for obfuscation.

### Real-Time Messaging

- Collaborate in real-time with other users in the messaging feature.
- Messages appear instantly as collaborators send them.

## Tech Stack

**Client:** React, antd, TailwindCSS

**Server:** Node, Express

**Real-Time Messaging:** WebSocket

**Database:** MongoDB

**Obfuscation Detection:** Custom algorithms for static and dynamic code analysis

## Contributing

Contributions are always welcome!

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes and commit them (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
