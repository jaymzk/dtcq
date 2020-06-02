//vars

const questions = [

    "If I was depressed about things in general.",
    "If I felt shaky or nauseous.",
    "If I was happy.",
    "If I felt that there was nowhere else to turn.",
    "If I wanted to see if I could use drugs in moderation.",
    "If I was in a place where I'd bought drugs before.",
    "If I felt tense or uneasy in the presence of someone.",
    "If I was invited to someone's home and felt awkward about saying no when they offered me drugs.",
    "If I met some old friends and decided to have a good time.",
    "If I was unable to express my feelings to someone.",
    "If I felt that I had let myself down.",
    "If I had trouble sleeping.",
    "If I felt confident and relaxed.",
    "If I was bored.",
    "If I wanted to prove to myself that these drugs were not a problem for me.",
    "If I unexpectedly found some of these drugs or happened to see something that reminded me of these drugs.",
    "If people rejected me or didn't seem to like me.",
    "If I was out with friends and they kept suggesting we go somewhere and use drugs.",
    "If I was with an intimate friend and we wanted to feel closer.",
    "If other people treat me unfairly or interfere with my plans.",
    "If I was lonely.",
    "If I wanted to stay awake, be more alert or energetic.",
    "If I felt excited about something.",
    "If I felt anxious or tense about something.",
    "If I wanted to find out whether I could use these drugs again occasionally without getting hooked again.",
    "If I had been drinking and thought about using drugs.",
    "If I felt that my family was putting a lot of pressure on me or that I could not measure up to their expectations.",
    "If others in the same room were using these drugs and I felt that the expected me to join in.",
    "If I was with friends and wanted to increase my enjoyment.",
    "If I was not getting along well with others at work or school.",
    "If I started to feel guilty about something.",
    "If I wanted to lose weight.",
    "If I was feeling content with my life.",
    "If I felt overwhelmed and wanted to escape.",
    "If I wanted to test out whether I could be with drug using friends without using these drugs.",
    "If I heard someone talking about their past experiences of taking drugs.",
    "If there were fights at home.",
    "If I was pressured to use these drugs and felt that I could not say no.",
    "If I wanted to celebrate with a friend.",
    "If someone was dissatisfied with my work I felt pressured at school or in work.",
    "If I was angry about how things had turned out.",
    "If I had a headache or was in physical pain.",
    "If I remembered something good that happened.",
    "If I felt confused about what I should do.",
    "If I wanted to test whether I could be in places where these drugs were being used without using any.",
    "If I began to think how good a rush or high I had felt.",
    "If I felt that I needed courage to face up to someone.",
    "If I was with a group of people and everyone else was using these drugs.",
    "If I was having a good time and wanted to increase my sexual enjoyment.",
    "If I felt that someone was trying to control me and I wanted to feel more independent."
]

let nextQuestion = 0;
let scores = []
let graphData = []

let data = [{
    "name": "Unpleasant Emotions",
    "value": 0,
},
{
    "name": "Physical Discomfort",
    "value": 0,
},
{
    "name": "Positive Emotional States",
    "value": 0,
},
{
    "name": "Testing Personal Control",
    "value": 0,
},
{
    "name": "Urges and Temptations to Use",
    "value": 0,
},
{
    "name": "Conflict with Others",
    "value": 0,
},
{
    "name": "Social Pressure to Use",
    "value": 0,
},
{
    "name": "Pleasant times with Others",
    "value": 0,
}
];

//funcs

const beginTheTest = () => {
  document.getElementById("begin-the-test").remove()
  printQuestion(nextQuestion)

}

const handleScoreClick = (e) => {
    const thisScore = parseInt(e.target.value)
    scores.push(thisScore)
    if (scores.length === 50) {
        endTheTest()
    } else {
    console.log(scores)
    nextQuestion++
    printQuestion(nextQuestion)  
    }  
}

const printQuestion = (question) => {
    document.getElementById("questions").innerText = questions[question]
}

const endTheTest = () => {
    //clean up the screen
    document.getElementById("intro").remove()
    document.getElementById("instructions").remove()
    document.getElementById("questions").remove()
    document.getElementById("buttons").remove()

    //collate scores
 
    data[0].value = (scores[0]+scores[3]+scores[10]+scores[13]+scores[20]+scores[23]+scores[30]+scores[33]+scores[40]+scores[43])/10
    data[1].value = (scores[1]+scores[11]+scores[21]+scores[31]+scores[41])/5
    data[2].value = (scores[2]+scores[12]+scores[22]+scores[32]+scores[42])/5
    data[3].value = (scores[4]+scores[14]+scores[24]+scores[34]+scores[44])/5
    data[4].value = (scores[5]+scores[15]+scores[25]+scores[35]+scores[45])/5
    data[5].value = (scores[6]+scores[9]+scores[16]+scores[19]+scores[26]+scores[29]+scores[36]+scores[39]+scores[46]+scores[49])/10
    data[6].value = (scores[7]+scores[17]+scores[27]+scores[37]+scores[47])/5
    data[7].value = (scores[8]+scores[18]+scores[28]+scores[38]+scores[48])/5
 
    //draw graph


 const margin = {
    top: 15,
    right: 25,
    bottom: 15,
    left: 200
};

const width = 800 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

const svg = d3.select("#chart-container").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

const x = d3.scale.linear()
    .range([0, width])
    .domain([0, d3.max(data, function (d) {
        return d.value;
    })]);

const y = d3.scale.ordinal()
    .rangeRoundBands([height, 0], .1)
    .domain(data.map(function (d) {
        return d.name;
    }));

//make y axis to show bar names
var yAxis = d3.svg.axis()
    .scale(y)
    //no tick marks
    .tickSize(0)
    .orient("left");

var gy = svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)

var bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("g")

//append rects
bars.append("rect")
    .attr("class", "bar")
    .attr("y", function (d) {
        return y(d.name);
    })
    .attr("height", y.rangeBand())
    .attr("x", 0)
    .attr("width", function (d) {
        return x(d.value);
    });

//add a value label to the right of each bar
bars.append("text")
    .attr("class", "label")
    .attr("fill", "white")
   
    //y position of the label is halfway down the bar
    .attr("y", function (d) {
        return y(d.name) + y.rangeBand() / 2 + 4;
    })
    //x position is 30 pixels before the end of the bar
    .attr("x", function (d) {
        return x(d.value) - 30;
    })
    .text(function (d) {
        return d.value;
    });      
}

//refs
document.getElementById("begin-the-test").addEventListener('click', beginTheTest)
document.getElementById("score-button-0").addEventListener('click', handleScoreClick)
document.getElementById("score-button-20").addEventListener('click', handleScoreClick)
document.getElementById("score-button-40").addEventListener('click', handleScoreClick)
document.getElementById("score-button-60").addEventListener('click', handleScoreClick)
document.getElementById("score-button-80").addEventListener('click', handleScoreClick)
document.getElementById("score-button-100").addEventListener('click', handleScoreClick)