
export const  dtpFooter = {
	props:{
		clockbtn:{
			default:true
		},
		calendarbtn:{
			default:true
		},
		todaybtn:{
			default:true
		},
		selectbtn:{
			default:true
		},
	},
	data(){
		return{
			
		}
	},
	mounted: function () {
		if(this.clockbtn == 'false')
			this.$refs['clockbtn'].classList.add('d-none')
		if(this.calendarbtn == 'false')
			this.$refs['calendarbtn'].classList.add('d-none')
		if(this.todaybtn == 'false')
			this.$refs['todaybtn'].classList.add('d-none')
		if(this.selectbtn == 'false')
			this.$refs['selectbtn'].classList.add('d-none')
	},
	methods: { 
			displayClock : function(){
					this.$emit('showclock', 'clock')	
			},
			displayCalendar : function(){
					this.$emit('showcal')	
			},
			displaytoday : function(){
					this.$emit('showtoday')	
			},
			dtpSelected : function(){
					this.$emit('dtpselect', 'setOutput')	
			},
	},
	// Input template .............
	template: '        <div class="modal-footer d-flex">'+
	'<div class="flex-fill text-center">'+
	'<button ref="selectbtn" class="btn zoomin text-muted" value="output" @click="dtpSelected()" >'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">'+
	'<path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>'+
	'<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>'+
	'</svg>	'+
	'</button>'+
	'</div>	'+
	'<div class="flex-fill text-center">'+
	'<button ref="todaybtn" class="btn zoomin text-muted" @click="displaytoday()" >'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar4-event" viewBox="0 0 16 16">'+
	'<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v1h14V3a1 1 0 0 0-1-1H2zm13 3H1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5z"/>'+
	'<path d="M11 7.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>'+
	'</svg>	'+
	'</button>'+
	'</div>'+
	'<div class="flex-fill text-center">'+
	'<button ref="calendarbtn" class="btn zoomin text-dark"  @click="displayCalendar()">'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-calendar3" viewBox="0 0 16 16">'+
	'<path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>'+
	'<path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>'+
	'</svg>	'+
	'</button>'+
	'</div>'+
	'<div class="flex-fill text-center">'+
	'<button ref="clockbtn" class="btn zoomin text-muted"  @click="displayClock()" >'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">'+
	'<path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>'+
	'<path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>'+
	'</svg>	'+
	'</button>'+
	'</div>'+
	'</div>'
}
