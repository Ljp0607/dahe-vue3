import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => ({
    counter: 0,
    userId: "",
    activityNo: "81ff463cb6374dbf9b37303cb742adc8",
    citys: [],
    city: {
      city_id: "",
      city_name: ""
    },
    detail: {
      postsVideo: '',
      postsImg: '',
      postsTitle: ''
    }
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    },
    changeCity(e: { city_id: string; city_name: string; }) {
      this.city = e
    },
    changeUserId(e: string) {
      this.userId = e
    },
    changeActive(e: string) {
      this.activityNo = e
    },
    changeDetail(e: { postsVideo: string, postsImg: string, postsTitle: string }) {
      this.detail = e
    }
  }
})