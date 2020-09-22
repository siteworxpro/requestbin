<template>
  <div>
    <h4 class="text-center">
      Bin URL
    </h4>
    <h2 class="text-center">
      <input
        ref="url"
        class="xxlarge input-xxlarge"
        type="text"
        readonly
        :value="baseUrl + '/' + name"
        :style="'border-color: rgb' + color + '; border-width: 3px;'"
        @click="select()"
      >
    </h2>
    <Notification v-if="copied">
      Copied to Clipboard!
    </Notification>
    <p
      v-if="isPrivate"
      class="text-center"
    >
      This is a private bin. Requests are only viewable from this computer.
    </p>
    <hr>
    <div class="row-fluid">
      <div class="span6 offset3">
        <h4>Make a request to get started.</h4>

        <h5>cURL</h5>
        <Code code-type="bash">curl -X POST -d "fizz=buzz" {{ baseUrl }}/{{ name }}</Code>

        <h5>Python (with Requests)</h5>
    <Code code-type="python">import requests, time
r = requests.post('{{ baseUrl }}/{{ name }}', data={"ts":time.time()})
print r.status_code
print r.content</Code>

        <h5>Node.js (with request)</h5>
  <Code code-type="js">var request = require('request');
var url ='{{ baseUrl }}/{{ name }}'
request(url, function (error, response, body) {
  if (!error) {
    console.log(body);
  }
});</Code>

        <h5>Ruby</h5>
  <Code code-type="ruby">require 'open-uri'
result = open('{{ baseUrl }}/{{ name }}')
result.lines { |f| f.each_line {|line| p line} }</Code>


          <h5>C# / .NET</h5>
    <Code code-type="c#">using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace RequestBinExample
{
  class Program
  {
    static void Main(string[] args)
    {
      MakeRequest();
    }

    private static async Task MakeRequest()
    {
      var httpClient = new HttpClient();
      var response = await httpClient.GetAsync(new Uri("{{ baseUrl }}/{{ name }}"));
      var body = await response.Content.ReadAsStringAsync();
      Console.WriteLine(body);
    }
  }
}</Code>

        <h5>Java</h5>
        <Code code-type="java">import org.apache.commons.httpclient.*;
import org.apache.commons.httpclient.methods.*;
import org.apache.commons.httpclient.params.HttpMethodParams;

import java.io.*;

public class RequestBinTutorial {
  public static void main(String[] args) {
    HttpClient client = new HttpClient();
    GetMethod method = new GetMethod("{{ baseUrl }}/{{ name }}");
    try {
      int statusCode = client.executeMethod(method);
      byte[] responseBody = method.getResponseBody();
      System.out.println(new String(responseBody));
    } catch (Exception e) {
      System.err.println("Fatal error: " + e.getMessage());
      e.printStackTrace();
    } finally {
      method.releaseConnection();
    }
  }
}</Code>

        <h5>PHP</h5>
    <Code code-type="php">&lt;?php
$result = file_get_contents('{{ baseUrl }}/{{ name }}');
echo $result;</Code>
      </div>
    </div>
  </div>
</template>
<style scoped>
input[readonly] {
  cursor: pointer;
  background-color: white;
}
</style>
<script>

const Code = () => import(/* webpackChunkName: "/components/code" */ '../components/code.vue')
const Notification = () => import(/* webpackChunkName: "/components/notification" */ '../components/notification.vue')

export default {
  components: { Notification, Code },
  props: {
    baseUrl: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    isPrivate: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      copied: false
    }
  },
  methods: {
    select() {
      this.$refs.url.select()
      document.execCommand("Copy")
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 2000)
    }
  }
}
</script>