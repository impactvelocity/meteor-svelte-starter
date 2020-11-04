<script>
	import { Link } from 'svelte-routing'
</script>

<style>
	.main {
		padding: 10px;
	}
</style>

<div class="main">
	<!-- <Link to="/admin">Admin</Link> -->
	<h1>Learning Meteor Mongo World.</h1>

	<div class="p-10">
		<slot />
	</div>
</div>
