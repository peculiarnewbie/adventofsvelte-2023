<script lang="ts">
	import { onMount } from "svelte";
	import "../../app.css";
	let { data } = $props();

	let children: { name: string; tally: number }[] = $state([]);

	const nameSort = () => {
		const sortedChildren = children.toSorted((a, b) => {
			if (a.name < b.name) return -1;
			if (a.name > b.name) return 1;
			return 0;
		});
		children = [...sortedChildren];
	};

	const tallySort = (fromNicest: boolean) => {
		let sortedChildren;
		if (!fromNicest) {
			sortedChildren = children.toSorted((a, b) => a.tally - b.tally);
		} else {
			sortedChildren = children.toSorted((a, b) => b.tally - a.tally);
		}
		children = [...sortedChildren];
	};

	onMount(() => {
		children = [...data.input];
	});
</script>

<div class="bg-gray-950 p-4 text-slate-200">
	<a href="/">
		<button class="rounded-md bg-gray-500 p-2"> Home </button>
	</a>
	<div class="p-3"></div>
	<p>Sort:</p>
	<button onclick={nameSort} class="w-40 rounded-md bg-gray-500 p-2">Alphabetically</button>
	<button onclick={() => tallySort(true)} class="w-40 rounded-md bg-blue-500 p-2">Nicest</button>
	<button onclick={() => tallySort(false)} class="w-40 rounded-md bg-red-500 p-2">Naughtiest</button
	>
	<div class="p-3"></div>
	{#each children as child}
		<div class="flex gap-2">
			<div>{child.name}</div>
			<div>{child.tally}</div>
			{#if child.tally > 0}
				<p>Nice</p>
			{:else}
				<p>Naughty</p>
			{/if}
		</div>
	{/each}
</div>
