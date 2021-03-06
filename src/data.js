const jsonSongList = [{
    Id:1,
    url:"https://s3.amazonaws.com/candidate-task/Track+1.mp3",
    owner:"Ori Winokur",
    bpm:120
    },{
    Id:2,
    url:"https://s3.amazonaws.com/candidate-task/Track+2.mp3",
    owner:"Yonatan Pistiner",
    bpm:100
    },{
    Id:3,
    url:"https://s3.amazonaws.com/candidate-task/Track+3.mp3",
    owner:"Barak Inbar",
    bpm:123
    }, {
    Id:4,
    url:"https://s3.amazonaws.com/candidate-task/Track+4.mp3",
    owner:"Ori Winokur",
    bpm:80
    }, {
    Id:5,
    url:"https://s3.amazonaws.com/candidate-task/Track+5",
    owner:"Yonatan Pistiner",
    bpm:60
    },{
    Id:6,
    url:"https://s3.amazonaws.com/candidate-task/Track+6",
    owner:"Barak Inbar",
    bpm:90
    }];

    // reformat json ,add uniaue ID (not relaying on given id's) 
    const jsonSongListWithIds = jsonSongList.map((json,index) => {
        const jsonUrlSplit = json.url.split("/");
        const songName = jsonUrlSplit[jsonUrlSplit.length -1];
        json.songName = songName;
        return {index,json};
    })
    export default jsonSongListWithIds;