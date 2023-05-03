const yargs = require('yargs/yargs');
const { getCategory } = require('./api.js');
const { search } = require('./app.js');

const app = require('./app.js');


yargs(process.argv.slice(2))
    .usage('$0: Usage <command> [options]')
    .command(
        //command
        'search <category>', 
        //description for command
        'search for a recipe by category', 
        //builder function to build out command arguments and options
        //argument inside function below represents an instance of yargs
        (yargs) => {
            //configures a command argument based off the name
            //first argument below must match the name given in the <>
            //second argument is an options object
            return (
                yargs
                    .positional('category', {
                        describe: 'name of the recipe category',
                        type: 'string',
                        choices: ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 
                            'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat']
                    })
                    //options aka flags that exist on our command
                    //first argument is the short or long form for the option name (ex: long form)
                    //alias is opposite form of the first argument (ex: short form)
                    .options('neat form', {
                        alias: 'n',
                        describe: 'the neat form of recipe without unnecessary information',
                    })
            );
        }, 
        //handler function for handling parsed command, command arguments, and options
        (args) => {
            const choice = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 
                'Starter', 'Vegan', 'Vegetarian', 'Breakfast', 'Goat'];
            
            if(choice.includes(args.category)){
                search(`${args.category}`);
            }
            else{
                console.log('This is not a category');
            }
            //invoke function for this
        }
    )
    .help()
    //help() builds a menu using the details from our yargs setup
    //argv gets the arguments as a plain Javascript object and passes them to handler (when used)
    .argv;