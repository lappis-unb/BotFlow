# BotFlow -  a platform for creating contents for Rasa chatbots

## About the project
BotFlow is a platform developed by [LAPPIS](https://lappis.rocks) - Advanced laboratory of production, research and innovation in Software (FGA/UnB) to facilitate the creation and editing of content inserted in chatbots developed through the Implementation of the [Rasa](https://blog.rasa.com/) framework for development of chatbot.

This platform is part of a project done by a partnership with Brazil's Ministry of Citizenship, it is used to create the content for [Tais](https://github.com/lappis-unb/tais), a chatbot for the [culture incentive law](http://leideincentivoacultura.cultura.gov.br/).

* **Want to develop a chatbot using the RASA Framework?? ✏️** [Access Rasa Boiler Plate](https://github.com/lappis-unb/rasa-ptbr-boilerplate)

* **Want to see BotFlow on pruduction?? 💻** [Access here](https://botflow.lappis.rocks)


## The Architecture

The BotFlow is developed using React JS and Redux for the frontend layer. The backend is developed with Django REST, in the [BotFlow API repository](https://github.com/lappis-unb/botFlowAPI).

The frontend is divided in Pages, Components and Ducks:
* **Ducks** - The ducks folder contains the actions and reducers for Intents, Uttters and Stories. It configures the store and have all the functions needed for data manipulation and API connection.
* **Components** - The application pages are componentized, and this folder contain all its separate compontents.
* **Pages** - Contain the website pages.

In [Tais architecture](https://lappis-unb.github.io/tais/documentacao/arquitetura/), this platform generates the training data.

![image](app/public/botflow-architecture.png)

## Running the application
 
To run the BotFlow on your computer, just run `docker-compose up` on the app's folder. The platform will be running on `localhost:3000`.

To run application properly you'll have to run the API as well. To do so, clone the [API repository](https://github.com/lappis-unb/botFlowAPI) and run `docker-compose up`.

## Run the tests

* To run the tests use the command on the app/ folder:

    ``` sh
    npm test
    ```

* To run the tests and see the final coverage run:

    ``` sh
    npm test -- --coverage --watchAll=false
    ```

## License
The entire BotFlow platform is developed under the license [GPL3](https://github.com/lappis-unb/BotFlow/blob/master/LICENSE)

View all the license dependencies [here](https://libraries.io/github/lappis-unb/BotFlow).
