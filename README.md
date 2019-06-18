# BotFlow-Platform for creating and editing contents of Rasa chatbot.

# # About the project
BotFlow is a platform developed by LAPPIS-Advanced laboratory of production, research and innovation in Software (FGA/UnB), in partnership with the Ministry of Culture to facilitate the creation and editing of content inserted in chatbots developed through the Implementation of the RASA framework such as Tais, a chatbot developed for the project of the Rouanet law.

<!-- Useful Links: -->
* **What is Lappis? ✏️** [Meet Lappis](https://lappis.rocks)
* **What is Tais? 🤔** [Meet Tais](https://github.com/lappis-unb/tais)
* **What is Rasa?** [Meet Rasa](https://blog.rasa.com/)


# # BotFlow Features
* Creation and editing questions
* Creating and editing responses
* Creation and editing of conversation streams
* Interaction test for content created or edited


## Technologies Used
The BotFlow platform is developed through the use of the following technologies:

- React. JS - Used in our frontend layer

- Node. JS - Used in our backend layer for implementation of our API

- API - designed to handle data from creations and content edits within the BotFlow platform

- MongoDB - Used for construction of the database responsible for keeping the information added on the platform.

In addition our platform works with the export of data in the MarkDown format because it is the type of source format used in the creation of Chatbots implemented with the RASA framework.

API repository: [Access here](https://github.com/lappis-unb/BotFlowAPI)



## How to Contribute
To contribute to the BotFlow platform and facilitate the interaction of more people in creating and editing content is very easy!


-First we will enable a local environment for work, so just follow the step by step described below:
    
* Check Prerequisites:

    It is necessary to have a Docker or Node8 machine installed and (Yarn or NPM)

    * [Docker](https://www.docker.com/)

    * [Node8](https://nodejs.org/es/blog/release/v8.0.0/)

    * [Yarn](https://yarnpkg.com/pt-BR/)

    * [Npm](https://www.npmjs.com/)


* Clone repository:

    `git clone https://github.com/lappis-unb/BotFlow`


- Climbing platform locally using Docker
    Make sure you are in the root folder of the project and run the command below:

    `sudo docker-compose -up --build`


- Climbing platform locally using NODE8 with Yarn
    Make sure it is in the app folder by running the command below

    `cd /app`

    Then run the following commands

     `yarn install`

    `yarn start`


- Climbing platform locally using NODE8 with NPM
    Make sure it is in the app folder by running the command below

    `cd /app`

    Then run the following commands

    `npm install`

    `npm start`


Then the execution according to the choice of one of the previous operations, the platform will be available through access in:
    
`http://localhost:3000/`




- Now that you have understood how to enable the environment locally, we will be very happy to receive and incorporate your contributions. For this we have some additional information about the style of the Code and documentation.

    In general the process is very simple:


    - Create an issue in our repository describing a feature that you want to work with


    - Write your code, tests or documentation


    - Open a pull request describing your proposed changes
        Your pull request will be revised by one of the maintainers, who can raise questions for you about any necessary changes or issues.

Read the [Contribution Guide] () for better information.



## Linceça
The entire BotFlow platform is developed under the license [GPL3]


