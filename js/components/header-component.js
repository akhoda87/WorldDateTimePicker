
export const  dtpHeader = {
	props:{
		closebtn:{
			default:true
		},
		hour:{
			required:true
		},
		minute:{
			required:true
		},
		second:{
			required:true
		},
		dtpcurrent:{
			required:true
		},
		yearseen:{
			default:'d-none'
		},
		monthseen:{
			default:'d-none'
		},
		clockseen:{
			default:'d-none'
		},
		calendarseen:{
			default:''
		},
		months:[]
	},
	data(){
		return{
			
		}
	},
	mounted: function () {
		if(this.closebtn == 'false')
			this.$refs['closebtn'].classList.add('d-none') 
	},
	methods: {
		closeModal:function(){
			this.$emit('close')	
		},
		monthPicker:function(){
			
			this.$emit('monthpicker')	
		},
		yearPicker:function(){
			
			this.$emit('yearpicker')	
		},
		wheelMonth:function(event , change){
			this.$emit('chmonth',{event , change})
		}
	},
	// Input template .............
	template: '<div class="modal-header d-table" >'+
	'<div >	'+
	'<button type="button" id="closebtn" ref="closebtn" class="btn-close" aria-label="Close"  @click="closeModal()">'+
	'<span aria-hidden="true"> </span>'+
	'</button>'+
	'</div>'+
	'<div class="d-flex" align="center" dir="rtl">'+
	'<div class="justify-content-between m-auto" ></div>'+
	'<div class=" justify-content-start" >'+
	'<button class="border-0 btn btn-sm btn-outline-dark"  :class="calendarseen" @click="wheelMonth($event , -1)">'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">'+
	'<path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>'+
	'</svg>'+
	'</button>'+
	'</div>'+
	'<div class="justify-content-between m-auto" ></div>'+
	'<div class=" justify-content-center" >'+
	'<button class="btn btn-outline-info fw-bolder" :class="monthseen" @click="yearPicker()">'+
	'{{dtpcurrent.year.locDigit}}'+
	'</button>'+
	'<button class="btn btn-outline-info fw-bolder" @click="monthPicker()"  :class="calendarseen" >'+
	'{{dtpcurrent.dayName}} {{dtpcurrent.day.locDigit}}'+
	'{{dtpcurrent.monthName}}'+
	'{{dtpcurrent.year.locDigit}}'+
	'</button>'+
	'<span :class="clockseen" class="fw-bold" style="font-size: 24px">'+
	'{{hour}}:{{minute}}:{{second}}'+
	'</span>'+
	'</div>'+
	'<div class="justify-content-between m-auto" ></div>'+
	'<div class=" justify-content-end" >'+
	'<button class="border-0 btn btn-sm btn-outline-dark" :class="calendarseen" @click="wheelMonth($event , 1)">'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-compact-left" viewBox="0 0 16 16">'+
	'<path fill-rule="evenodd" d="M9.224 1.553a.5.5 0 0 1 .223.67L6.56 8l2.888 5.776a.5.5 0 1 1-.894.448l-3-6a.5.5 0 0 1 0-.448l3-6a.5.5 0 0 1 .67-.223z"/>'+
	'</svg>'+
	'</button>'+
	'</div>'+
	'<div class="justify-content-between m-auto" ></div>'+
	'</div>'+
	'</div>'
	}