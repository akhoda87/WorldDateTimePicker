"use strict";
import {dtpComponent}  from './components/form-component';
import {jalali}  from './jalali';
let formapp = {	
	data(){
			return{
				// object that convert Gregorian date to Local date
				objlocal:jalali,
				// week days array
				weekdays:[
						{full:'شنبه',short:'شنبه'},
						{full:'یکشنبه',short:'یک'},
						{full:'دوشنبه',short:'دو'},
						{full:'سه‌شنبه',short:'سه'},
						{full:'چهارشنبه',short:'چهار'},
						{full:'پنجشنبه',short:'پنج'},
						{full:'جمعه',short:'جمعه',holliday:true}
					]
			}
	},
	methods: {
		// programmer function to get data ( date and time in json format)
		getdt:function(dtObj){
			console.log(dtObj)
		}
	},
	// define vue date & time picker component
	components: dtpComponent
}
let app = Vue.createApp(formapp).mount('#app')