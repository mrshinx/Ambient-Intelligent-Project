

// edit your experiment here: 
// define the sequence of images and their duration
// 1. column = image file
// 2. column = duration in seconds
// important: all images should have the same size. the size of the first image defines the size of the eyetracking area. 

var experiment = 
[
['experiment_1024x768px.jpg', 5], //0
['frog_1024x768px.jpg', 5], //1
['room.jpg', 5], //2
['bulb_off.png', 5], //3
['bulb_on.png', 5], //4
['fan_off.jpg', 5], //5
['fan_weak.jpg', 5], //6
['fan_medium.jpg', 5], //7
['fan_strong.jpg', 5], //8
['tv_off.jpg', 5], //9
['tv_movies.jpg', 5], //10
['tv_news.png', 5], //11
['tv_sport.png', 5] //12
];




// URLs fpr the machine learning models

//const FACEMESH_GRAPHMODEL_URL = 'https://tfhub.dev/mediapipe/tfjs-model/facemesh/1/default/1';
const FACEMESH_GRAPHMODEL_URL = 'https://mediablix.de/facemesh_1';
const BLAZEFACE_MODEL_URL="https://mediablix.de/blazeface_1";


