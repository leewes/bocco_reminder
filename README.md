<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/leewes5928/bocco_reminder">
    <img src="images/logo.png" alt="Logo" width="80">
  </a>

  <h3 align="center">Talk Bocco </h3>

  <p align="center"></p>
    <br />
    <a href="https://github.com/leewes5928/bocco_reminder"><strong>Access the repository »</strong></a>
    <br />
    <br />
    <a href="https://github.com/leewes5928/bocco_reminder/issues">Report Bug</a>
    ·
    <a href="https://github.com/leewes5928/bocco_reminder/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#deployment">Deployment</a></li>
        <li><a href="usage">Usage</a>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#authors">Authors</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img src="./images/bocco.jpg" alt="BOCCO">

An application to allow BOCCO emo to respond to custom voice commands. 

_This was developed during our time as students at Code Chrysalis_


<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* [Express](https://expressjs.com/)
* [Axios](https://axios-http.com/)
* [translate-google](https://github.com/shikar/NODE_GOOGLE_TRANSLATE)
* [Heroku](https://heroku.com)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a copy of the project up and running follow these steps.

<!--PREREQUISITES-->
### Prerequisites
 1. Register an account through the [BOCCO App](https://apps.apple.com/jp/app/bocco-emo/id1545221442)
 2. Connect BOCCO emo to your account and room **_refer to User Manual_
 3. Login to the [management portal](https://platform-api.bocco.me/dashboard/login) and retrieve your REFRESH_TOKEN
 4. Deploy to an [application platform service](https://www.heroku.com)
 
<!-- INSTALLATION -->
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/leewes5928/bocco_reminder.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- DEPLOYMENT -->
### Deployment
When deploying to Heroku the following environmental variables must be set.
```sh
URL = https://{HEROKU_APP_NAME}.herokuapp.com/api/hook
REFRESH_TOKEN = {BOCCO_ACCOUNT_REFRESH_TOKEN}
```

<p align="right">(<a href="#top">back to top</a>)</p>


<!--- USAGE -->
### Usage
This application primarily utilizes the recording function of BOCCO emo and responds with [messages](https://platform-api.bocco.me/api-docs/#post-/v1/rooms/-room_uuid-/messages/text) using [webhooks](https://platform-api.bocco.me/api-docs/#put-/v1/webhook/events).

Currently the application supports the following speech commands through BOCCO emo recordings:
1. 宿題が終わった？ with a response dependent on the time
2. 退屈、つまらない、つまんない、暇 with a suggested activity
3. アドバイス with a random piece of advice


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'add some AmazingFeature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- AUTHORS -->
## Authors

- **Wesley Lee** - _Tech Lead_ - [leewes5928](https://github.com/leewes5928)
- **Maho Miyazawa** - [Maho-Miyazawa](https://github.com/Maho-Miyazawa)
- **Nao Nomura** - [naonmr](https://github.com/naonmr)

Project Link: [https://github.com/leewes5928/bocco_reminder](https://github.com/leewes5928/bocco_reminder)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [BOCCO emo Platform API](https://platform-api.bocco.me/)
* [Bored API](http://www.boredapi.com/)
* [Advice Slip JSON API](https://api.adviceslip.com/)
* [Translate Google](https://github.com/shikar/NODE_GOOGLE_TRANSLATE/)
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template/)

<p align="right">(<a href="#top">back to top</a>)</p>


[contributors-shield]: https://img.shields.io/github/contributors/leewes5928/bocco_reminder.svg?style=for-the-badge
[contributors-url]: https://github.com/leewes5928/bocco_reminder/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/leewes5928/bocco_reminder.svg?style=for-the-badge
[forks-url]: https://github.com/leewes5928/bocco_reminder/network/members
[stars-shield]: https://img.shields.io/github/stars/leewes5928/bocco_reminder.svg?style=for-the-badge
[stars-url]: https://github.com/leewes5928/bocco_reminder/stargazers
[issues-shield]: https://img.shields.io/github/issues/leewes5928/bocco_reminder.svg?style=for-the-badge
[issues-url]: https://github.com/leewes5928/bocco_reminder/issues
