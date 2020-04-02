<template>
  <div class="ItemList">

    <v-expansion-panel style="font-size: 1.1em;" class="elevation-0">
      <v-expansion-panel-content
              hide-actions
              v-for="(item, index) in memos"
              :key="index"
      >
        <template class="title" v-slot:header>
          <div>{{item.title}}</div>
        </template>
        <v-card>
          <v-card-text class="memo">{{item.memo}}
            <v-btn class="btn-remove" icon small @click="() => deleteMemo(item.id)">
              <v-icon size="15">delete</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>

export default {
	name: 'ItemList',
	props: ['memos', 'deleteMemo']
}
</script>

<style scoped>
  .memo {
    padding: 0px 42px 12px 24px;
    color: rgba(0, 0, 0, .54);
    font-size: 0.9em;
  }
  .btn-remove {
    position: absolute;
    margin: 0;
    top: -5px;
    right: 10px;
    color: #aaa;
  }
</style>

