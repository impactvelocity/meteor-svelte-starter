<script>
	import { track } from '/imports/utils/useTracker'
	import { Tasks } from '/imports/api/collections/tasks'
	import { TaskLists } from '/imports/api/collections/tasklists'
	import { listen } from 'svelte/internal'
	import { Meteor } from 'meteor/meteor'

	import { LoginWindow } from 'meteor/levelup:svelte-accounts-ui'

	let tasks
	let isReady
	let isReady_lists
	let newTask = ''

	let tasklists

	let userId

	track(() => {
		userId = Meteor.userId()
	})

	track(() => {
		isReady = Meteor.subscribe('tasks').ready()
		isReady_lists = Meteor.subscribe('tasklists').ready()
	})

	track(() => {
		tasks = Tasks.find({ owner: { $eq: userId } }).fetch()
	})

	track(() => {
		tasklists = TaskLists.find({}).fetch()
	})

	function addNewTask(event) {
		Meteor.call('tasks.insert', newTask)

		// Clear form
		newTask = ''
	}

	function deleteTask(id) {
		console.log(id)
		Meteor.call('tasks.remove', id)
	}
	function completeTask(id, complete) {
		console.log(id)
		complete = !complete
		Meteor.call('tasks.toggleComplete', id, complete)
	}
	// task lists
	function createNewList() {
		console.log('create new array list!')
		Meteor.call('tasklists.insert', 'List Title...')
	}
	function addTaskToList(id, currentList) {
		console.log(id)
		console.log(currentList)
		console.log('Push empty task array to list?')
		let blankTask = { id: 'x2as12', title: 'New Task', complete: false }
		// currentList.push(blankTask)
		// console.log(currentList)
		Meteor.call('tasklists.addTask', id, blankTask)
	}
</script>

<!-- <div>Home Page &nbsp;|&nbsp; <Link to="/pages/about-us">About Us</Link></div> -->
{#if !userId}
	<LoginWindow />
{:else}
	<div class="p-10 ">
		<h2 class="text-xl font-medium">
			<b>GOAL #1</b>
			- Tasks Collection
			{userId}
		</h2>
		<h4 class="text-sm mt-1 opacity-75">
			Each task is a seperate item in the DB...
		</h4>

		<div class="p-5 mt-5 bg-gray-100 rounded">
			{#each tasks as task}
				<!-- only show task that have an id - bug? -->
				{#if task._id}
					<div
						class="p-3 bg-white rounded shadow-md mb-2 flex items-center cursor-pointer">
						<button
							on:click={() => {
								completeTask(task._id, task.complete)
							}}>[
							{#if task.complete}X{/if}
							]</button>
						<h2 class="ml-2 flex-grow">{task.title}</h2>
						<button
							on:click={() => {
								deleteTask(task._id)
							}}>(x)</button>
					</div>
				{/if}
			{/each}
		</div>

		<form class="new-task" on:submit|preventDefault={addNewTask}>
			<input
				class="border border-gray-500 rounded p-2 mt-5 w-full"
				type="text"
				placeholder="Type to add new tasks"
				bind:value={newTask} />
		</form>

		<div class="p-5 text-xs text-gray-600">{JSON.stringify(tasks)}</div>
	</div>

	<div class="p-10">
		<h2 class="text-xl font-medium">
			<b>GOAL #2</b>
			- Tasks as Object Collection
		</h2>
		<h4 class="text-sm mt-1 opacity-75">
			The tasks are an object / jsonb with an ID ...
		</h4>

		<div class="p-5">
			<button
				on:click={() => {
					createNewList()
				}}>Create a new List</button>
		</div>

		<div>
			{#each tasklists as list}
				<!-- only show list that have an id - bug? -->
				{#if list._id}
					<div class="p-5 mt-5 bg-gray-100 rounded">
						<h2 class=" font-bold text-lg">{list.title}</h2>
						<h2 class="mb-5 text-sm">{list._id}</h2>

						<!-- loop through array in list -->
						<div class="p-5 bg-white shadow border border-gray-400">
							{#each list.list as task}
								<div class="border-b border-gray-400 p-3">{task.title}</div>
							{/each}

							<button
								on:click={() => {
									addTaskToList(list._id, list.list)
								}}
								class="mt-3 font-bold">Add Task To List</button>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="p-5 mt-5 bg-gray-100 rounded">{JSON.stringify(tasklists)}</div>
	</div>
{/if}
