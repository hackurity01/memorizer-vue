<template>
  <v-dialog
          width="500"
  >
    <v-card>
      <v-card-title
              class="headline grey lighten-2"
              primary-title
      >
        Privacy Policy
      </v-card-title>

      <v-card-text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
                color="primary"
                flat
                @click=""
        >
          I accept
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
export default {
	name: 'AddDialog',
	data () {
		return {}
	}
}
</script>


<style scoped>
  .memo {
    padding: 0px 24px 12px;
    color: rgba(0,0,0,.54);
    font-size: 0.9em;
  }
</style>

