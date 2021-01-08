<script>
	import {
		coffeePackages,
		preparationPretty,
		preparationTypes,
		skuNumbers
	} from './store-main.js'

	console.log($coffeePackages);
	
</script>


<div class="comp-coffee-packages card max">
<table>
	<thead>
		<tr>
			<th></th>
			{#each preparationTypes as preparationType}
				<th class="text small regular">{preparationPretty[preparationType].abbr}</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each skuNumbers as skuNumber}
			<tr>
				<td class="text uppercase contrast small">{skuNumber}</td>
				{#each preparationTypes as preparationType}
					<td class="text center {$coffeePackages[skuNumber][preparationType] > 0 ? 'bold' : undefined}">{$coffeePackages[skuNumber][preparationType]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
</div>

<style>
	.comp-coffee-packages {
		padding: 2rem;
		margin-bottom: 1rem;
	}
	 table {
		 table-layout: fixed;
		 width: 100%;
		 border-collapse: collapse;
	 }
	 table tr th {
		 white-space: nowrap;
		 overflow: hidden;
		 text-overflow: ellipsis;
	 }
	 table tr td {
		 padding-top: 7px;
		 padding-bottom: 7px;
	 }
	 table tbody tr:nth-child(odd) {
		background-color: #eee;
	 }
	 /* @media screen and (min-width: 24em) {
		 table tr {
			height: 5vw;
		 }
	}
	*/
</style>