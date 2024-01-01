# StatelessServerApplication

A stateless server application which uses a custom node module to interact with an API that connects and stores data on Mongo Atlas Cloud. This application utilizes [themealdb](https://www.themealdb.com/api.php) API.

## Installation 

1. Clone the Repository:

```bash
git clone https://github.com/alexhalcazar/StatelessServerApplication.git
cd StatelessServerApplication
```

## Dependencies 

2. Install Dependencies:

The project relies on the following npm packages:

- [Express](https://www.npmjs.com/package/express/v/4.18.2)
- [MongoDB Node.js Driver](https://github.com/mongodb/node-mongodb-native)
- [Superagent](https://www.npmjs.com/package/superagent?activeTab=versions)

Navigate to the 'recipes-application' folder and install its dependencies:

```bash
cd recipes-application
npm install
```

This command installs dependencies for both 'recipes-application' and 'recipes-api'.

3. Create a MongoDB Atlas Account:

+ Users need to create their own MongoDB Atlas account if they don't have one. They can sign up for a free account on the [MongoDB Atlas website](https://www.mongodb.com)

4. Set Up a Cluster:

+ After creating an account, users need to set up a MongoDB Atlas cluster. This involves configuring the cluster's location, cluster tier, and other settings.

5. Create a Database User:

+ Users should create a database user with appropriate privileges for their application. The credentials (username and password) of this user will be part of the MongoDB Atlas connection string.

6. Get the Connection String:

+ Once the cluster is set up and the database user is created, users can obtain the MongoDB Atlas connection string. This string includes information about the cluster, authentication credentials, and other details.

7. Set Up Configuration file:

+ Users should set up their configuration to be able to connect to MongoDB Atlas database using their connection string. This can be done by copying the **'config.json'** and customizing with their MongoDB Atlas credentials:

Example **'config.json'**

```json
{
    "username": "demo-user",
    "password": "123",
    "database_name": "RecipeApp"
}
```

Users would replace **username** **password** and **database_name** with their own MongoDB Atlas credentials.

**Note:** Be sure to add your newly created **'config.json'** to your **'.gitignore'** file.

## Demo Database (for showcase purposes only)

The application comes with a demo user config.json file allowing users to connect to a MongoDB database hosted on MongoDB Atlas for demonstration purposes.

## Usage

8. Start the recipes-application server:

```bash
npm start
```

This command should now be executed within the 'recipes-application' folder.

## Access the Stateless Server 

Currently this ToDoList web application has two endpoints:

### Search

[Search for a specific meal category](http://localhost:4000/search?category=meal)

Be sure to replace "meal" with a valid meal category.

**Example**

http://localhost:4000/search?category=chicken

The following are a list of the valid meal categories:

    - Beef
    - Chicken
    - Dessert
    - Lamb
    - Miscellaneous
    - Pasta
    - Pork
    - Seafood
    - Side
    - Starter
    - Vegan
    - Vegetarian
    - Breakfast
    - Goat

### History

[View all past meal searches](http://localhost:4000/history)

## Reporting Issues

If you encounter any issues or have suggestions for improvement, please [create an issue](https://github.com/alexhalcazar/StatelessServerApplication/issues)

## Authors

Alex Alcazar, Hugo Izquierdo, Bryan Gonzalez


