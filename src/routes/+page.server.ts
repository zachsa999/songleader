
import type { PageServerLoad, Actions } from './$types';


let out = 'Subject,Start Date,Start Time,All Day Event\n';

export const load = (async ({ cookies }) => {
    return { out };
}) satisfies PageServerLoad;

export const actions: Actions = {
    default: async ({ event, request }) => {
        const data = await request.formData();


        const name1 = data.get('name1');
        const name2 = data.get('name2');
        const name3 = data.get('name3');
        const name4 = data.get('name4');
        const date = new Date(`${data.get('date')}`);
        console.log(date);

        let leaders = [
            {
                1: `${name1} and ${name2}`,
                0: `${name2} and ${name1}`,
                used: 0
            },
            {
                1: `${name1} and ${name3}`,
                0: `${name3} and ${name1}`,
                used: 0
            },
            {
                1: `${name1} and ${name4}`,
                0: `${name4} and ${name1}`,
                used: 0
            },
            {
                1: `${name2} and ${name3}`,
                0: `${name3} and ${name2}`,
                used: 0
            },
            {
                1: `${name2} and ${name4}`,
                0: `${name4} and ${name2}`,
                used: 0
            },
            {
                1: `${name3} and ${name4}`,
                0: `${name4} and ${name3}`,
                used: 0
            }
        ];


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
            // let first = new Date('January 1, 2023');
            // let date = startDate

            let i = 0;

            while (i < 52) {
                leaders.forEach(leader => {
                    if (i < 52) {
                        const randTwo = Math.floor(Math.random() * 2);
                        i = i + 1;
                        // console.log(leader[randTwo]);
                        out = out + `${(leader[randTwo])}, ${date.toLocaleDateString('en-US')}, 10: 00 AM, true\n`

                        date.setDate(date.getDate() + 7);
                        leader.used = leader.used + 1;
                    }
                });
                shuffle(leaders);
            }

            leaders.forEach(leader => {
                console.log(`leader: ${leader[0]} used: ${leader.used} `);
            })
        }
        newSave();
        console.log(out);
        return {
            success: true,
            form: out,
        }
    }
}