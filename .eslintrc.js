module.exports = {
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true
        }
    },
    "parser": "babel-eslint",
    "extends": "airbnb-base", 
    "rules": {    
        "no-console": 0,
        "no-use-before-define": ["error", { "functions": false }],
        "no-return-assign": 0,
        'no-param-reassign': 0,
        'max-len': 0,
        "import/extensions": { "js": "always", "json": "never" },  
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
    },
}