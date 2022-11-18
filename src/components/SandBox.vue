<template>
  <div>
    <div class="add-note-form">
      <input type="text" v-model="newUser" />
      <button @click="addUser">Add a quick note</button>
    </div>
    <div>
      <ul v-for="user in users" :key="user">
        <li>
          {{ user }}
          <span class="remove-note" @click="delUser(user)">x</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    users: [],
    newUser: '',
  }),
  props: {
    msg: String,
  },
  methods: {
    addUser: function () {
      this.users = [this.newUser, ...this.users]
      this.newUser = ''
    },
    delUser: function (user) {
      const newArray = this.users.filter((name) => name !== user)
      this.users = newArray
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h2 {
  color: blue;
}

ul,
li {
  margin: 0;
  padding: 0;
}
.add-note-form {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  input {
    width: 60%;
    margin: 0;
    padding: 0;
    height: 30px;
    display: block;
  }
  button {
    width: 10%;
    margin: 0;
    padding: 0;
    height: 30px;
    display: block;
    margin-top: 10px;
  }
}

.remove-note {
  font-weight: bold;
  color: red;
  cursor: pointer;
}
</style>
