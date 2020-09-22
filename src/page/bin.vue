<template>
  <div>
    <Request
      v-for="request in requests"
      :key="request.id"
      :request="request"
      :base-url="baseUrl"
    />
    <Help
      v-if="requests.length === 0"
      :base-url="baseUrl"
      :name="id"
      :color="color"
    />
  </div>
</template>
<script>
import axios from 'axios'

const Request = () => import(/* webpackChunkName: "/components/request" */ '../components/request.vue')
const Help = () => import(/* webpackChunkName: "/components/help" */ '../components/help.vue')

export default {
  components: { Help, Request },
  props: {
    id: {
      type: String,
      required: true
    },
    baseUrl: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      requests: []
    }
  },
  created() {
    this.fetchRequests()
    setInterval(this.fetchRequests, 1000)
  },
  methods: {
    fetchRequests() {
      axios.get(`/api/v1/bins/${this.id}/requests`)
        .then(r => {
          this.requests = r.data
        })
    }
  }
}
</script>