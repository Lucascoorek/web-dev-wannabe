import Vue from "vue";

Vue.prototype.$stringToUrl = (str) => str.replace(/ /gi, "-");
