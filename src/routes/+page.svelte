<script lang="ts">
	import { onMount } from 'svelte';

	let url = ``;

	onMount(() => (url = window.location.href));
	let name1 = '';
	let name2 = '';
	let name3 = '';
	let name4 = '';
	let date = new Date('January 30, 2023');
	let frequency = 7;

	function download(filename: string, text: string) {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
		element.setAttribute('download', filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	}

	function leaderArr(name1: string, name2: string, name3: string, name4: string) {
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

		return leaders;
	}

	function shuffle(array: any) {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex != 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	function newSave() {
		let leaders = leaderArr(name1, name2, name3, name4);
		shuffle(leaders);

		let first = new Date(date);
		let output = 'Subject,Start Date,Start Time,All Day Event\n';

		let i = 0;

		while (i < 52) {
			leaders.forEach((leader) => {
				if (i < 52) {
					const randTwo = Math.floor(Math.random() * 2);
					i = i + 1;
					console.log(leader[randTwo]);
					(output =
						output + `${leader[randTwo]},${first.toLocaleDateString('en-US')},10:00 AM,true\n`),
						first.setDate(first.getDate() + 1);
					leader.used = leader.used + 1;
				}
			});
			shuffle(leaders);
		}
		(output =
			output +
			`Visit ${url} to create next years schedule,${first.toLocaleDateString(
				'en-US'
			)},10:00 AM,true\n`),
			leaders.forEach((leader) => {
				console.log(`leader: ${leader[0]} used: ${leader.used}`);
			});

		download('out.csv', output);
	}
</script>

<h1>Welcome</h1>
<form>
	<h3>Please Enter 4 Names to generate a calender file</h3>
	<input type="text" name="name1" bind:value={name1} placeholder="Person" required />
	<input type="text" name="name2" bind:value={name2} placeholder="Person" required />
	<input type="text" name="name3" bind:value={name3} placeholder="Person" required />
	<input type="text" name="name4" bind:value={name4} placeholder="Person" required />
	<h3>Please Enter a Date starting sunday of the current year.</h3>
	<input type="date" name="date" bind:value={date} required />
	<h3>Please Select a Frequency (# of days )</h3>
	<input type="number" name="frequency" bind:value={frequency} required />
	<div><button on:click={() => newSave()} type="submit">Submit</button></div>
</form>

<h1>Instructions</h1>
<p>Open the file and verify the dates are correct</p>
<p>Navigate to google Calender</p>
<p>Click the gear icon in the top right</p>
<p>Click Settings</p>
<p>Click Import and Export on the left</p>
<p>Upload the file</p>
<h4>Ensure you have the correct calender selected in the dropdown</h4>
<p>Click Import</p>
