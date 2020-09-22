<template>
  <div
    :id="'message-wrapper-' + request.id"
    class="message-wrapper"
  >
    <div class="message-list">
      <div class="row-fluid">
        <div class="span4">
          {{ baseUrl }}<br>
          <span class="method">{{ request.method }}</span>
          <span class="absolute-path">{{ request.path }}</span><span class="querystring">{{ toQs(request.query_string) }}</span>
        </div>
        <div class="span6 content">
          <i
            v-if="request.content_type"
            class="icon-code"
          /> {{ request.content_type }}<br>
          <i class="icon-cloud-upload" /> {{ getReadableFileSizeString(request.content_length) }}
        </div>
        <div
          class="span2 timestamp"
        >
          <span :title="request.time">{{ getReadableTime(request.time) }}
            <a :href="'#' + request.id"><i class="icon-link" /></a>
          </span><br>
          From {{ request.remote_addr }}
        </div>
      </div>
    </div>
    <div
      :id="'detail-' + request.id"
      class="message-detail"
    >
      <div
        :id="'request-detail-' + request.id"
        class="request-detail"
      >
        <div class="row-fluid">
          <div class="span4">
            <h5>FORM/POST PARAMETERS</h5>
            <p
              v-for="(v, k) in request.form_data"
              :key="k"
              class="keypair"
            >
              <strong>{{ v[0] }}:</strong> {{ v[1] }}
            </p>
            <em v-if="request.form_data.length === 0">None</em>

            <h5>QUERYSTRING</h5>
          </div>
          <div class="span8">
            <h5>HEADERS</h5>
            <p
              v-for="header in headers"
              :key="header.header"
              class="keypair"
            >
              <strong>{{ header.header }}:</strong> {{ header.value }}
            </p>
          </div>
          <h5>RAW BODY</h5>
            <Code :code-type="codeType" v-if="request.raw">{{ request.raw }}</Code>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
const Code = () => import(/* webpackChunkName: "/components/code" */ '../components/code.vue')

export default {
  components: { Code },
  props: {
    request: {
      type: Object,
      required: true
    },
    baseUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    codeType() {
      if (this.request.content_type === 'application/xml') {
        return 'xml'
      }

      if (this.request.content_type === 'application/json') {
        return 'json'
      }

      return 'plain-text'
    },
    headers() {
      const headers = []

      Object.keys(this.request.headers).forEach(k => {
        headers.push({
          header: k,
          value: this.request.headers[k]
        })
      })

      return headers
    }
  },
  methods: {
    toQs(qs) {
      if (Object.keys(qs).length === 0) {
        return ''
      }

      const params = []

      Object.keys(qs).forEach((k) => {
        params.push(k + '=' + qs[k])
      })

      return '?' + params.join('&')
    },
    getReadableTime(dateTime) {
      return moment(dateTime * 1000).fromNow()
    },
    getReadableFileSizeString(fileSizeInBytes) {
      let i = -1
      let byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB']
      do {
        fileSizeInBytes = fileSizeInBytes / 1024
        i++
      } while (fileSizeInBytes > 1024)

      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i]
    }
  }
}
</script>