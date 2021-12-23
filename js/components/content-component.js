export const  dtpContent = {
	props:{
		dtpcurrent:{
			required:true	
		},
		disableclass:{
				default:'flex-fill btn btn-sm btn-outline-secondary border-0 '
		},
		activeclass:{
			default:'flex-fill btn btn-sm btn-outline-dark  border-0'
		},
		todayclass:{
			default:'flex-fill btn btn-sm btn-success  border-0'
		},
		hollidayclass:{
			default:'flex-fill btn btn-sm btn-outline-danger fw-bolder  border-0'
		},
		chooseclass:{
			default:'flex-fill btn btn-sm btn-info '
		},
		dayclass:{
			default:'flex-fill'
		},
		calendarseen:{
				default:'flex-fill'
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
		months:{
				default:[]
		},
		hour:{
				default:'00'
		},
		minute:{
				default:'00'
		},
		second:{
				default:'00'
		},
	},
	data(){
		return{
			currentMonthMatrix:[],
			pHour:this.$parent.increase('hour',1),
			mHour:this.$parent.decrease('hour',1),
			pMin:this.$parent.increase('min',1),
			mMin:this.$parent.decrease('min',1),
			pSec:this.$parent.increase('sec',1),
			mSec:this.$parent.decrease('sec',1),
		}
	},
	mounted: function () {

	},
	methods: { 
		changeMonth:function(month){
			month = parseInt(month)
			month = (month < 10)? '0'+month : ''+month
			this.$emit('chmonth',month)
		},
		showCalendar:function(matrix){
			this.currentMonthMatrix = matrix
			this.resetCalendar()
			this.loadCalendar()
		},
		loadCalendar : function(){
				this.resetCalendar()
				for(let i = 0;i<this.currentMonthMatrix.length;i++){
					for(let j = 0;j<this.currentMonthMatrix[i].length;j++){
						if(this.currentMonthMatrix[i][j].full != undefined)
						 	this.$refs[i+''+j].innerHTML = this.currentMonthMatrix[i][j].short
						else if(this.$refs[i+''+j] !== undefined ){
							this.$refs[i+''+j].disabled = false
							
							this.$refs[i+''+j].innerHTML = this.currentMonthMatrix[i][j].day.locDigit
							this.$refs[i+''+j].className = this.currentMonthMatrix[i][j].class
							this.$refs[i+''+j].value = this.currentMonthMatrix[i][j].year.enDigit+'-'+
								this.currentMonthMatrix[i][j].month.enDigit+'-'+this.currentMonthMatrix[i][j].day.enDigit
						}
					}
				}
			},
		resetCalendar:function(){
				for(let i = 0;i<7;i++){
					for(let j = 1;j<7;j++){
							this.$refs[i+''+j].innerHTML = ''
							this.$refs[i+''+j].disabled = true
							this.$refs[i+''+j].className = this.disableclass
					}
				}
			},
		decrease : function(type){
			this.$emit('decrease',type)
			if(type == 'hour'){
				this.pHour = this.$parent.increase(type,1)
				this.mHour = this.$parent.decrease(type,1)	
			}
			else if(type == 'min'){
				this.pMin = this.$parent.increase(type,1)
				this.mMin = this.$parent.decrease(type,1)	
			}
			else if(type == 'sec'){
				this.pSec = this.$parent.increase(type,1)
				this.mSec = this.$parent.decrease(type,1)	
			}
		},
		increase : function(type){
			this.$emit('increase',type)
			if(type == 'hour'){
				this.pHour = this.$parent.increase(type,1)
				this.mHour = this.$parent.decrease(type,1)	
			}
			else if(type == 'min'){
				this.pMin = this.$parent.increase(type,1)
				this.mMin = this.$parent.decrease(type,1)	
			}
			else if(type == 'sec'){
				this.pSec = this.$parent.increase(type,1)
				this.mSec = this.$parent.decrease(type,1)	
			}
		},
		wheelIt: function(event , type){
			this.$emit('wheelit',event , type)
			if(type == 'hour'){
				this.pHour = this.$parent.increase(type,1)
				this.mHour = this.$parent.decrease(type,1)	
			}
			else if(type == 'min'){
				this.pMin = this.$parent.increase(type,1)
				this.mMin = this.$parent.decrease(type,1)	
			}
			else if(type == 'sec'){
				this.pSec = this.$parent.increase(type,1)
				this.mSec = this.$parent.decrease(type,1)	
			}
		},
		changeTime:function(event , type){
			this.$emit('changetime',event , type)
			if(type == 'hour'){
				this.pHour = this.$parent.increase(type,1)
				this.mHour = this.$parent.decrease(type,1)	
			}
			else if(type == 'min'){
				this.pMin = this.$parent.increase(type,1)
				this.mMin = this.$parent.decrease(type,1)	
			}
			else if(type == 'sec'){
				this.pSec = this.$parent.increase(type,1)
				this.mSec = this.$parent.decrease(type,1)	
			}
		},
		wheelMonth:function(event,change = 0){
			this.$emit('wheelMonth',{event , change })
		}
		,
		chooseDate:function(event){
			this.$emit('chooseDate',event)
		}
	},
	// Input template .............
	template: '        <div class="modal-body text-center" align="center">'+
	'<div :class="calendarseen" id="calendarform" @wheel.passive="wheelMonth($event)" >'+
	'<div class="d-flex bd-highlight fw-bolder">'+
	'<div :class="dayclass" id="00" ref="00"> </div>'+
	'<div :class="dayclass" id="10" ref="10"> </div>'+
	'<div :class="dayclass"  id="20" ref="20"> </div>'+
	'<div :class="dayclass" id="30" ref="30"> </div>'+
	'<div :class="dayclass" id="40" ref="40"> </div>'+
	'<div :class="dayclass" id="50" ref="50"> </div>'+
	'<div :class="dayclass" id="60" ref="60"> </div>'+
	'</div>'+
	'<div class="d-flex bd-highlight ">'+
	'<button class="" id="01" ref="01" @click="chooseDate($event)"> </button>'+
	'<button class="" id="11" ref="11" @click="chooseDate($event)"> </button>'+
	'<button class="" id="21" ref="21" @click="chooseDate($event)"> </button>'+
	'<button class="" id="31" ref="31" @click="chooseDate($event)"> </button>'+
	'<button class="" id="41" ref="41" @click="chooseDate($event)"> </button>'+
	'<button class="" id="51" ref="51" @click="chooseDate($event)"> </button>'+
	'<button class="" id="61" ref="61" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'<div class="d-flex bd-highlight">'+
	'<button class=""  id="02" ref="02" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="12" ref="12" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="22" ref="22" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="32" ref="32" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="42" ref="42" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="52" ref="52" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="62" ref="62" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'<div class="d-flex bd-highlight">'+
	'<button class=""  id="03" ref="03" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="13" ref="13" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="23" ref="23" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="33" ref="33" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="43" ref="43" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="53" ref="53" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="63" ref="63" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'<div class="d-flex bd-highlight">'+
	'<button class=""  id="04" ref="04" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="14" ref="14" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="24" ref="24" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="34" ref="34" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="44" ref="44" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="54" ref="54" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="64" ref="64" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'<div class="d-flex bd-highlight">'+
	'<button class=""  id="05" ref="05" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="15" ref="15" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="25" ref="25" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="35" ref="35" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="45" ref="45" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="55" ref="55" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="65" ref="65" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'<div class="d-flex bd-highlight">'+
	'<button class=""  id="06" ref="06" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="16" ref="16" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="26" ref="26" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="36" ref="36" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="46" ref="46" @click="chooseDate($event)"> </button>'+
	'<button class=""  id="56" ref="56" @click="chooseDate($event)"> </button>'+
	'<button class=""   id="66" ref="66" @click="chooseDate($event)"> </button>'+
	'</div>'+
	'</div>'+
	'<div :class="monthseen" ref="monthlist">'+
	'<div class=" flex-row" id="monthlist" >'+
	'<button class="col-3 btn btn-outline-dark m-1 btn-sm" v-for="(item, index) in months" :id="\'m\'+(index+1)" :ref="\'m\'+(index+1)" @click="changeMonth(index+1)" >{{item.monthName}}'+
	'</button>'+
	'</div>'+
	'</div>'+
	'<div :class="yearseen" ref="yearform" dir="ltr" >'+
	'<div class="flex-fill text-center" >'+
	'<button class="border-0 bg-white" @click="increase(\'year\')">'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-compact-up" viewBox="0 0 16 16">'+
	'<path fill-rule="evenodd" d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 		1-.448-.894l6-3z"/>'+
	'</svg>'+
	'</button>'+
	'<input type="text" class="form-control border-0  text-center text-muted"  style="font-size: 3em" id="dtyear" ref="dtyear" @wheel.passive="wheelIt($event , \'year\' )" :value="dtpcurrent.year.enDigit" />'+
	'<button class="border-0 bg-white" @click="decrease(\'year\')">'+
	'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-chevron-compact-down" viewBox="0 0 16 16">'+
	'<path fill-rule="evenodd" d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"/>'+
	'</svg>'+
	'</button>'+
	'</div>'+
	'</div>'+
	'<div class="d-flex " :class="clockseen" ref="clockform" dir="ltr" >'+
	'<div class="flex-fill text-center" >'+
	'<button class="border-0 bg-white" @click="increase(\'hour\')">'+
	'{{pHour}}'+
	'</button>'+
	'<input type="text" class="form-control border-0  text-center text-muted"  style="font-size: 3em" id="dthour" @wheel.passive="wheelIt($event , \'hour\' )" :value="hour" @change="changeTime($event , \'hour\' )" />'+
	'<button class="border-0 bg-white" @click="decrease(\'hour\')">'+
	'{{mHour}}'+
	'</button>'+
	'</div>'+
	'<div class="flex-fill text-center" >'+
	'<button class="border-0 bg-white"  @click="increase(\'min\')">'+
	'{{pMin}}'+
	'</button>'+
	'<input type="text" class="form-control  border-0  text-center text-muted" style="font-size: 3em" id="dtmin" @wheel.passive="wheelIt($event , \'min\' )" @change="changeTime($event , \'min\' )" :value="minute" />'+
	'<button class="border-0 bg-white"  @click="decrease(\'min\')">'+
	'{{mMin}}'+
	'</button>'+
	'</div>'+
	'<div class="flex-fill text-center " >'+
	'<button class="border-0 bg-white" @click="increase(\'sec\')">'+
	'{{pSec}}'+
	'</button>'+
	'<input type="text" class="form-control  border-0 text-center text-muted " style="font-size: 3em" id="dtsec" @wheel.passive="wheelIt($event , \'sec\' )" @change="changeTime($event , \'sec\' )" :value="second" />'+
	'<button class="border-0 bg-white"  @click="decrease(\'sec\')">'+
	'{{mSec}}'+
	'</button>'+
	'</div>'+
	'</div>'+
	'</div>'
	}
