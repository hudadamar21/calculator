Vue.component('button-number',{
  props: {
    name: String,

  },
  template: `<button class="bg-gray-600 w-12 h-12 text-white mt-1 mr-1 focus:outline-none border border-gray-600" :class="name ? 'hover:bg-gray-500' : 'cursor-default'">{{ name }}</button>`
})

Vue.component('button-operator', {
  props: {
    name: String,
  },
  template: `<button class="bg-gray-600 w-16 h-12 text-white focus:outline-none border border-gray-600" :class="name == 'HartDev' ? 'p-1 text-sm cursor-default' : 'hover:bg-gray-500'">{{ name }}</button>`
})

new Vue({
  el: '#app',
  data: {
    numbers: [
      ['C','','Del'],
      ['1','2','3'],
      ['4','5','6'],
      ['7','8','9'],
      ['','0','']
    ],
    operators: ['HartDev','+','-','x','/'],

    values: '',
    hasil: '',
    trueHasil: '',
    info: false
  },
  watch:{
    values(newval){
      if(newval.slice(-1) != '+' &&
         newval.slice(-1) != '-' &&
         newval.slice(-1) != '/' &&
         newval.slice(-1) != '*'){
            this.hasil = eval(newval)
            this.trueHasil = eval(newval)
      } 
    },
    hasil(newval){
      if(newval){
        if(newval % 1 !== 0){
          this.info = true
          this.hasil = this.prettyFloat(newval)
        }else{
          this.info = false
        }
      }else{
        this.info = false
      }
    }
  },
  methods: {
    action(val){
      if(val === 'C') {
        this.values = ''
        this.hasil = ''
      } else if(val === 'Del') {
        this.values = this.values.slice(0, -1)
      } else {
        if(this.values.slice(-1) == '+' ||
           this.values.slice(-1) == '-' ||
           this.values.slice(-1) == '/' ||
           this.values.slice(-1) == '*' 
          ){
          if(val != '+' &&
             val != '-' &&
             val != '/' &&
             val != '*'
          ){
            this.values = this.values+val
          }else{
            console.error('you can\'t write double operator')
          }
        } else if(this.values == ''){
            if(val != '*' &&
               val != '/'){
                this.values = this.values+val
            }else{
              console.error('you can\'t start with / or *')
            }
          } else{
            this.values = this.values+val
          }
        
      }  
    },
    prettyFloat(val) {
      return Number.parseFloat(val).toFixed(2);
    },
    handleInfo(){
      this.info = true
    }
  }
})