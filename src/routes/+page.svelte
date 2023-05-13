<script lang="ts">
	import { onMount } from 'svelte';

	let url = ``;

	onMount(() => (url = window.location.href));
	let name1 = 'First';
	let name2 = 'Second';
	let name3 = 'Third';
	let name4 = 'Fourth';
	let date = '';
	let frequency = 7;
	let recurrence = 52;

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

	function getCombinationsOfSongleaders(songleaders: [any, any, any, any]): any[][] {
		let result: any[][] = [];
		function helper(
			arr: [any, any, any, any],
			data: any[],
			start: number,
			end: number,
			index: number
		) {
			if (index === 2) {
				result.push([...data]);
				result.push([data[1], data[0]]); // Add inverted combination
				return;
			}
			for (let i = start; i <= end && end - i + 1 >= 2 - index; i++) {
				data[index] = arr[i];
				helper(arr, data, i + 1, end, index + 1);
			}
		}
		helper(songleaders, [], 0, songleaders.length - 1, 0);
		return result;
	}

	function shuffleSongleader(songleaderArray: any[]): any[] {
		let currentIndex = songleaderArray.length,
			temporaryValue,
			randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = songleaderArray[currentIndex];
			songleaderArray[currentIndex] = songleaderArray[randomIndex];
			songleaderArray[randomIndex] = temporaryValue;
		}

		return songleaderArray;
	}

	function newCSV(songleaders: string[], year: number, customText?: string) {
		songleaders = shuffle(songleaders);

		let songleaderCSV = 'Subject,Start Date,Start Time,All Day Event,Description\n';
		let index = 0;
		for (let week = 0; week < 52; week++) {
			let date = new Date(year, 0, 1 + week * 7); // Start from the first day of the year
			date.setDate(date.getDate() - date.getDay() + 7); // Get the first Sunday of the year
			let formattedDate =
				(date.getMonth() + 1).toString().padStart(2, '0') +
				'/' +
				date.getDate().toString().padStart(2, '0') +
				'/' +
				date.getFullYear();
			let startTime = '10:00 AM';
			if (index >= songleaders.length) {
				songleaders = shuffle(songleaders);
				index = 0;
			}
			let subject = `${songleaders[index][0]} and ${songleaders[index][1]}`;
			if (week >= 50 && customText) {
				subject += customText;
			}
			songleaderCSV += `${subject},${formattedDate},${startTime},False,"This entry was created by https://zachw.ca/songleader go there to generate calender entries for the following year"\n`;
			index += 1;
		}
		return songleaderCSV;
	}

	let songleaders: any = ['Bob', 'Joe', 'Dan', 'Steve'];
	let year = 2022;

	let finalString = ': need more? https://zachw.ca/songleader';
</script>

<h1>Welcome</h1>
<form>
	<h3>Please Enter 4 Names to generate a calender file</h3>

	<input type="text" name="name1" bind:value={songleaders[0]} placeholder="Person" required />
	<input type="text" name="name2" bind:value={songleaders[1]} placeholder="Person" required />
	<input type="text" name="name3" bind:value={songleaders[2]} placeholder="Person" required />
	<input type="text" name="name4" bind:value={songleaders[3]} placeholder="Person" required />

	<pre>{newCSV(
			shuffleSongleader(getCombinationsOfSongleaders(songleaders)),
			year,
			finalString
		)}</pre>
	<button
		on:click={() =>
			download(
				'songleader-csv.csv',
				newCSV(shuffleSongleader(getCombinationsOfSongleaders(songleaders)), year, finalString)
			)}>Download</button
	>

	<h3>Please Enter a Date starting sunday of the current year.</h3>
	<input
		type="number"
		name="year"
		bind:value={year}
		min="2023"
		max="9999999999"
		step="1"
		required
	/>
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
