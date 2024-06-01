<h1 align="center">
  <br>
  <a href="https://quizzes.vertiree.com/"><img src="https://quizzes.vertiree.com/assets/icons/common/clock.svg" alt="Quizzes" width="200"></a>
  <br>
  Quizzes On-Chain
  <br>
</h1>

<h4 align="center"> A decentralized game-based platform that allows users to create or join interactive quizzes for educational, survey or discussion purposes.</h4>

<p align="center">
 <!-- <a href="https://nextjs.org/">
      <img src="https://strapi.dhiwise.com/uploads/Next_JS_Forms_and_Mutations_with_App_Router_OG_Image_e2f9eb6a40.webp" height=28 alt='Next.js' >
  </a> -->
  <a href="https://nextjs.org/">
      <img src="https://repository-images.githubusercontent.com/705845437/fb3d7529-2e80-4f03-b7a3-37488e5bf049" height=28 alt='Next.js' >
  </a>
  <a href="https://www.typescriptlang.org/">
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"
         alt="Typescript" height=28>
  </a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt='TailwindCSS' height=28></a>
</p>

<!-- <p align="center">
  <a href="#🚀-getting-started">Getting started</a> •
  <a href="#🔑-key-features">Key Features</a> •
  <a href="#🛠️-tech-stack">TechStack</a> •
  <a href="#📁-structure">Structure</a> •
  <a href="#🌐-environment">Environment</a> •
  <a href="#📝-version">Version</a> •
  <a href="#👤-author">Author</a>
</p> -->

[Getting Started](#-getting-started) • [Key Features](#-key-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Structure](#-structure) • [Environment](#-environment) • [Version](#-version) • [Author](#-author)

## <div id='getting-started'>🚀 Getting Started</div>

#### ⚙️ Prepare the environment

1. Make sure you have [Node.js](https://nodejs.org/) installed, preferably with [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/). Ensure that your Node.js version is **20.0.0 or higher**.

2. Clone this repository.

3. Install the dependencies

```bash
   yarn install
```

or

```bash
   npm install
```

#### 🏁 Run app in your browser

Run the following command at the root path of the project

```bash
yarn start:${env} or npm run start:${env}
```

- **dev**: Development environment used during application development and testing.
- **stag**: Staging environment serves as an intermediate environment between development and production.
- **prod**: Production environment where the application runs in real-world scenarios serving end-users.

## <div id='key-features'>🔑 Key Features</div>

- Blockchain-Based Quiz Storage and Scoreboard
  - Decentralized Data Storage: The DApp stores all created quizzes and game scoreboards on the SUI blockchain. This ensures that the data is immutable, transparent, and secure, preventing any tampering or unauthorized changes.
  - Enhanced Security: By leveraging zkLogin, the DApp ensures secure and private user authentication, protecting user data and quiz results with advanced cryptographic methods.
- Interactive, Game-Based Learning
  - Engaging Quiz Formats: The DApp allows users to create and participate in interactive quizzes. These quizzes can include various types of questions such as multiple-choice, true/false, and more, making learning fun and engaging.
  - Real-Time Participation: Users can join live quiz games using a unique game PIN, allowing for real-time interaction and competition. The live leaderboard updates dynamically as participants answer questions, adding an element of excitement.
- Self-Paced and Live Game Modes
  - Flexible Learning Options: The DApp offers both live game modes for real-time interaction and self-paced challenges where participants can complete quizzes at their own convenience. This flexibility caters to different learning styles and schedules.
  - Performance Analytics: After each game, detailed analytics and performance reports are available. Host and participants can review these reports to assess understanding, track progress, and identify areas for improvement.

## <div id='tech-stack'>🛠️ Tech Stack</div>

#### 💻 Languages

- HTML
- CSS
- TypeScript

#### 📚 Frameworks/Libraries

- **React.js:** Used for building user interfaces with a component-based architecture.
- **Next.js:** A React framework that provides server-side rendering, static site generation, and other features to enhance performance and SEO.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.

## <div id='structure'>📁 Structure</div>

```plaintext
quizzes-on-chain/
├── .env/
├── .husky/
├── .next/
├── .vscode/
├── public/
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── styles/
│   └── pwa/
│       ├── android/
│       ├── ios/
│       └── windows11/
│
├── src/
│   ├── app/
│   ├── components/
│   ├── config/
│   ├── constant/
│   ├── hooks/
│   ├── providers/
│   ├── store/
│   ├── types/
│   └── utils/
├── ...
```

## <div id='environment'>🌐 Environment</div>

- [NEXT_PUBLIC_APP_HOST](#environment) - Domain of project.
- [NEXT_PUBLIC_API_HOST](#environment) - API base URL.
- [NEXT_PUBLIC_SOCKET_HOST](#environment) - Socket host URL.
- [NEXT_PUBLIC_ZK_PROVER_ENDPOINT](#environment) - API for zk proof.
- [NEXT_PUBLIC_CLIENT_ID_GOOGLE](#environment) - Google provider ID for zk login.
- [NEXT_PUBLIC_CLIENT_ID_TWITCH](#environment) - Twitch provider ID for zk login.
- [NEXT_PUBLIC_CLIENT_ID_FACEBOOK](#environment) - Facebook provider ID for zk login.
- [NEXT_PUBLIC_CONTRACT_ADDRESS](#environment) - SUI smart contract address for create Quizz on-chain.

## <div id='version'>📝 Version</div>

1.0.0

## <div id='author'>👤 Author</div>

<a href="https://esollabs.com/">
    <img src="https://esollabs.com/_next/static/media/ic_logo.0517ae22.svg" height=30 alt='Esollabs' >
</a>
