// const fs = require('fs');
import fs from 'fs';
const fileContent = 'Subject,Start Date,Start Time,All Day Event\n';

let leaders = [
    {
        1: 'Zach and Braden',
        0: 'Braden and Zach',
        used: 0
    },
    {
        1: 'Zach and Shane',
        0: 'Shane and Zach',
        used: 0
    },
    {
        1: 'Zach and Shandon',
        0: 'Shandon and Zach',
        used: 0
    },
    {
        1: 'Shane and Shandon',
        0: 'Shandon and Shane',
        used: 0
    },
    {
        1: 'Braden and Shane',
        0: 'Shane and Braden',
        used: 0
    },
    {
        1: 'Braden and Shandon',
        0: 'Shandon and Braden',
        used: 0
    }
];

shuffle(leaders);


function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function newSave() {
    let first = new Date('January 30, 2023');
    let date = first;

    console.log('new save');
    console.log('making file');
    fs.writeFile('out.csv', fileContent, err => {
        console.log('writing file')
        if (err) {
            console.error(err);
            console.log(`Cannot write file: ${err}`);
        }
    });

    let i = 0;

    while (i < 12) {
        leaders.forEach(leader => {
            if (i < 52) {
                const randTwo = Math.floor(Math.random() * 2);
                i = i + 1;
                console.log(leader[randTwo]);
                fs.appendFile('out.csv', `${(leader[randTwo])},${date.toLocaleDateString('en-US')},10:00 AM,true\n`, err => {
                    if (err) {
                        console.error(err);
                    }
                });

                date.setDate(date.getDate() + 1);
                leader.used = leader.used + 1;
            }
        });
        shuffle(leaders);
    }

    leaders.forEach(leader => {
        console.log(`leader: ${leader[0]} used: ${leader.used}`);
    })

}

newSave();