// we will pull all of our application variables and functions inside this object
// reducing the random things we put in the window space from demo build
// attach features/functions to this object
var _E = {
    "fxn": {
        "common": {
            // common library functions
            // see evh_g_common.js
        }
        // other library functions can be added here
    },
    "state": {
        // state and control variables will be appended here
        // each feature might inject their own
        // for example cached lookups and the like or 
        // render flags for example
    },
    "feature": {
        // features will be appended here
        // enable_feature() will activate them
        // see evh_feature_*.js
    },
    "core": {
        // core feature will be appended here
        // some require startup() like interpreter
    }
};
