// use moment js for increase and decrease date
import  './moment-with-locales';
// header , content , footer components
import {dtpHeader}  from './header-component';
import {dtpContent}  from './content-component';
import {dtpFooter}  from './footer-component';

const formapp = {
		data : function(){
			return{
				modalEl:'calendarModal',// modal element id
				hour : '00',
				minute : '00',
				second : '00',
				hMax : 23,
				msMax : 59,
				months:[],
				dtpseen:true,
				yearseen:'d-none',
				monthseen:'d-none',
				clockseen:'d-none',
				calendarseen:'',
				lastChoosenId:false,
				currentMonthMatrix:[],
				dtpAction:'save-cal',
				dtpToday : this.getDateObject(false , this.location , false),
				dtpTodayUTC : this.getDateObject(false , 'en-US', true ),
				dtpcurrent:this.getDateObject(false , this.location , false),
				dtpchoosen:{year:false,month:false,day:false,hour:false,minute:false,second:false,dayName:false,monthName:false},
			}
		},
		props:{
			closeonclick:{
				default:true
			},
			firstpage:{
				default:'calendar'	
			},
			size:{
				default:'modal-md'	
			},
			localdigits:{
				default:false
			},
			outputtype:{
				default:'element'
			},
			closebtn:{
				default:true
			},
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
			modal:{
				default:true
			},
			date:{
				default:false
			},
			autoclose:{
				default:false
			},
			bgdark:{
				default:'bg-dark'
			},
			outputid :{
				default:'dtpoutput'
			},
			pattern :{
				default:'YYYY-mm-dd , HH:MI:SS'
			},
			id:{
				default:'dtpicker'
			},
			maker:{
				default:false
			},
			disableclass:{
				default:'flex-fill btn btn-sm btn-outline-secondary border-0 zoomin'
			},
			activeclass:{
				default:'flex-fill btn btn-sm btn-outline-dark zoomin border-0'
			},
			todayclass:{
				default:'flex-fill btn btn-sm btn-success zoomin border-0'
			},
			hollidayclass:{
				default:'flex-fill btn btn-sm btn-outline-danger fw-bolder zoomin border-0'
			},
			chooseclass:{
				default:'flex-fill btn btn-sm btn-info zoomin'
			},
			dayclass:{
				default:'flex-fill'
			},
			objlocal:{
						//default:jalali
						default:false
			},
			direction:{
				default:'ltr'
			},
			location : {
						default:'en-US'
						//default:'fa-IR'
			},
			timezone: {
						default:'UTC'
						//default:'Asia/Tehran'
			},
			weekdays:{
						default:[
							{full:'Sunday',short:'Sun',holliday:true},
							{full:'Monday',short:'Mon'},
							{full:'Tuesday',short:'Tue'},
							{full:'Wednesday',short:'Wen'},
							{full:'Thursday',short:'Thu'},
							{full:'Friday',short:'Fri'},
							{full:'Saturday',short:'Sat'}
						]
			}
		},
		mounted:function(){
			// when maker focused , date & time picker will be display
			// else directly show date & time picker
			if(this.maker != false)
				document.getElementById(this.maker).addEventListener( "focus", event =>
				  {
						this.openModal()
				  });
			else{
				this.$refs[this.modalEl].style = "position: relative !important"
				this.openModal()
			}
			// close Calendar Modal when clicked on black area
			if(this.closeonclick !== false && this.closeonclick != 'false'){
				document.addEventListener.call(window, "click", event =>
				  {
					if(event.target.id == this.modalEl)
						this.closeModal()
				});
			}
			// if default date set , choosen & current date equal that
			if(this.date !== false){
				let date = this.getDateObject(this.date , this.location , false)
				this.dtpchoosen = date
				this.dtpcurrent = date
			}
			// create calendar element
			this.createCalendarMatrix()
			this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
			this.hideElement()
			// set size of Modal (large , medium , small)
			this.$refs['modal-dialog'].classList.add(this.size)
			// set background dark 
			if(this.bgdark !== false || this.bgdark !== 'false')
				this.$refs[this.modalEl].classList.add(this.bgdark)
			// set first thing that user see
			if(this.firstpage == 'clock'){
				this.clockseen = ''
				this.calendarseen = 'd-none'	
			}
		},
		methods: {
			displayCalendar:function(){ // display calendar , hide all dtpicker elements except calendar
				this.hideElement()
			},
			openModal: function(){ // display Modal (bootstrap modal)
				this.$refs[this.modalEl].classList.add("show");
				this.$refs[this.modalEl].style.display = "block";
				
			},
			closeModal : function(){ // hide dtpicker modal when close button focused or dark area clicked
				if(!this.closebtn || this.closebtn == 'false')
					return true
				this.$refs[this.modalEl].classList.remove("show");
				this.$refs[this.modalEl].style.display = "none";
			},
			hideElement : function(type = false){ // when choose an element other elements will be hidden
				switch (type){
					case 'year':
								this.yearseen=''
								this.monthseen='d-none'
								this.clockseen='d-none'
								this.calendarseen='d-none'
						break;
					case 'month':
								this.yearseen='d-none'
								this.monthseen=''
								this.clockseen='d-none'
								this.calendarseen='d-none'
						break;
					case 'clock':
								this.yearseen='d-none'
								this.monthseen='d-none'
								this.clockseen=''
								this.calendarseen='d-none'
						break;
					default:
								this.yearseen='d-none'
								this.monthseen='d-none'
								this.clockseen='d-none'
								this.calendarseen=''
						break

				}
			},
			dtpSelected: function(action = 'setOutput'){ // when user select a date , choosen date set and according to programmer defined , output will be set
				if(this.$refs['dtpfooter'].$refs['selectbtn'].value  == 'save-year'){
					this.dtpcurrent.year = this.$refs['dtpcontent'].$refs['dtyear'].value
					this.dtpcurrent = this.getDateObject(this.dtpcurrent.year+'-'+this.dtpcurrent.month.enDigit+'-'+this.dtpcurrent.day.enDigit)
					this.createCalendarMatrix()
					this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
				}
				else{
					// .......................... Set date in output element
					// if no date selected , set today date in output
					let outputObj = this.dtpchoosen
					if(!outputObj.day)
						outputObj = this.dtpToday
					// set output format
					let output = this.pattern
					
					output = (!Boolean(this.localdigits))?output.replace('YYYY',outputObj.year.enDigit):output.replace('YYYY',outputObj.year.locDigit)
					output = (!Boolean(this.localdigits))?output.replace('YY',outputObj.year.enDigit):output.replace('YY',outputObj.year.locDigit)
					output = (!Boolean(this.localdigits))?output.replace('yyyy',outputObj.year.enDigit):output.replace('yyyy',outputObj.year.locDigit)
					output = (!Boolean(this.localdigits))?output.replace('yy',outputObj.year.enDigit):output.replace('yy',outputObj.year.locDigit)
					
					output = output.replace('MM',outputObj.monthName)
					output = (!Boolean(this.localdigits))?output.replace('mm',outputObj.month.enDigit):output.replace('mm',outputObj.month.locDigit)
					
					output = output.replace('DD',outputObj.dayName)
					output = (!Boolean(this.localdigits))?output.replace('dd',outputObj.day.enDigit):output.replace('dd',outputObj.day.locDigit)
					
					output = output.replace('HH',this.hour)
					output = output.replace('MI',this.minute)
					output = output.replace('SS',this.second)
					// if out put element was input Tag set value else set innerHTML
					let parent = document.getElementById(this.outputid)
					if(parent.tagName.toUpperCase() == 'INPUT')
						parent.value = output
					else
						parent.innerHTML = output
					// if output type is not element
					if(this.outputtype.toLowerCase() != 'element'){
						this.$emit('getdata',outputObj)
					}
					this.closeModal()
				}	
				this.hideElement()	
			},
			wheelMonth: function(event){ // when user wheel mouse in calendar mod , month will change
				let change = event.change
				event = event.event
				let objdate = this.dtpcurrent.year.enDigit+'-'+this.dtpcurrent.month.enDigit+'-'+this.dtpcurrent.day.enDigit
				objdate = this.getDateObject(objdate )
				
				let newDate = (!this.objlocal)? [this.dtpcurrent.year.enDigit,this.dtpcurrent.month.enDigit,this.dtpcurrent.day.enDigit]: this.objlocal.toUTC(this.dtpcurrent.year.enDigit,this.dtpcurrent.month.enDigit,this.dtpcurrent.day.enDigit)
				
				if(event.deltaY < 0 || change == '1') {
						newDate = moment(newDate[0]+'-'+newDate[1]+'-'+newDate[2]).add(1, "months").format("YYYY-MM-DD")
					
				} else if(event.deltaY > 0 || change == '-1'){
						newDate = moment(newDate[0]+'-'+newDate[1]+'-'+newDate[2]).subtract(1, "months").format("YYYY-MM-DD")
				}
				this.dtpcurrent = this.getDateObject(newDate,this.location,true)
				
				this.createCalendarMatrix()
				this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
			},
			changeMonth : function(month){ // when user select a month in month mod , this function run
				this.dtpcurrent.month.enDigit = parseInt(month)
				this.dtpcurrent = this.getDateObject(this.dtpcurrent.year.enDigit+'-'+this.dtpcurrent.month.enDigit+'-'+this.dtpcurrent.day.enDigit)
				this.hideElement()
				this.createCalendarMatrix()
				this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
			},
			displaytoday : function(){// when today button clicked
				let dt = this.dtpTodayUTC.year.enDigit+'-'+this.dtpTodayUTC.month.enDigit+'-'+this.dtpTodayUTC.day.enDigit
				this.dtpcurrent = (!this.objlocal)?this.getDateObject(dt,this.location,false):this.getDateObject(dt,this.location,true)
				
				this.createCalendarMatrix()
				this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
				this.hideElement()
			},
			displayYearPicker : function(){ // show year picker mod
				if(!this.selectbtn || this.selectbtn == 'false')
					this.$refs['dtpfooter'].$refs['selectbtn'].classList.remove('d-none')
				this.$refs['dtpfooter'].$refs['selectbtn'].value  = 'save-year'
				this.hideElement('year')
			},
			displayMonthPicker : function(){ // show month picker mod
				this.hideElement('month')
				let utcDate = {}
				if(this.months.length == 0)
					for(let i=1;i<13;i++){
						//console.log(this.dtpcurrent.year.enDigit)
						utcDate = this.dtpcurrent.year.enDigit+'-'+i+'-01'
						if(i<10)
							utcDate = this.dtpcurrent.year.enDigit+'-0'+i+'-01'
						if(this.objlocal !== false){
							utcDate = this.objlocal.toUTC(this.dtpcurrent.year.enDigit,i,'01')
							utcDate = utcDate[0]+'-'+utcDate[1]+'-'+utcDate[2]
						}
						this.months.push(this.getDateObject(utcDate,this.location,true)) 
					}
			},
			chooseDate : function(event){ // when user select a date , if autoclose set true , modal hide and set date to output
				this.dtpchoosen = this.getDateObject(event.target.value)
				this.dtpcurrent = this.getDateObject(event.target.value)
				this.createCalendarMatrix()
				this.$refs.dtpcontent.showCalendar(this.currentMonthMatrix)
				
				if(this.autoclose || this.autoclose == 'true'){
					this.dtpSelected()
					this.closeModal()
				}
			},
			getDateTime:function(obj = {date:false  , utc:true , location : 'en-US' , options : {timeZone: 'UTC'} }){
				// return date object , if date not set , return today
				if(obj.utc || obj.utc == undefined){
					let dateObj = (!obj.date || obj.date == undefined )?new Date():new Date(obj.date)
					return {enDigit:this.toEnglishDigits(dateObj.toLocaleString(obj.location, obj.options)),locDigit:dateObj.toLocaleString(obj.location, obj.options)}
				}
				else{
					let dateObj = new Date()
					if(!obj.date || obj.date == undefined ){
							return {enDigit:this.toEnglishDigits(dateObj.toLocaleString(obj.location, obj.options)),locDigit:dateObj.toLocaleString(obj.location, obj.options)}
						}
					else{
							obj.date = obj.date.replace('/','-')
							obj.date = obj.date.replace('/','-')
							let dateArray = obj.date.split('-')
							
							dateObj = (this.objlocal !== false) ? this.objlocal.toUTC(dateArray[0],dateArray[1],dateArray[2]) : dateArray
							
							dateObj = new Date(dateObj[0]+'.'+dateObj[1]+'.'+dateObj[2])
							return {enDigit:this.toEnglishDigits(dateObj.toLocaleString(obj.location, obj.options)),locDigit:dateObj.toLocaleString(obj.location, obj.options)}
						}
					
				}
				
			},
			getDateObject : function(date = false ,  location = this.location ,utc = undefined ){
				// return date object in formal that I prefer
					if(utc === undefined)
						utc = (this.objlocal !== false) ? false : true
					
					let cdate = {}
					cdate.year = this.getDateTime({date:date,utc:utc,location:location,options: {year: 'numeric',timeZone: this.timezone}})
					cdate.year.enDigit = cdate.year.enDigit;cdate.year.locDigit = cdate.year.locDigit
					
					cdate.month = this.getDateTime({date:date,utc:utc,location:location,options: {month: '2-digit',timeZone: this.timezone}})
					cdate.month.enDigit = cdate.month.enDigit;cdate.month.locDigit = cdate.month.locDigit
					
					cdate.day = this.getDateTime({date:date,utc:utc,location:location,options: {day: '2-digit',timeZone: this.timezone}})
					cdate.day.enDigit = cdate.day.enDigit;cdate.day.locDigit = cdate.day.locDigit
					
					cdate.hour = this.getDateTime({date:date,utc:utc,location:location,options: {hourCycle: 'h23',hour: '2-digit',timeZone: this.timezone}})
					cdate.hour.enDigit = cdate.hour.enDigit;cdate.hour.locDigit = cdate.hour.locDigit
					
					cdate.minute = this.getDateTime({date:date,utc:utc,location:location,options: {minute: '2-digit',timeZone: this.timezone}})
					cdate.minute.enDigit = cdate.minute.enDigit;cdate.minute.locDigit = cdate.minute.locDigit
				
					cdate.second = this.getDateTime({date:date,utc:utc,location:location,options: {second: '2-digit',timeZone: this.timezone}})
					cdate.second.enDigit = cdate.second.enDigit;cdate.second.locDigit = cdate.second.locDigit
					
					cdate.dayName = this.getDateTime({date:date,utc:utc,location:location,options: {weekday: 'long',timeZone: this.timezone}}).enDigit
					
					cdate.monthName = this.getDateTime({date:date,utc:utc,location:location,options: {month: 'long',timeZone: this.timezone}}).enDigit
					
					for(let i=0;i<this.weekdays.length;i++)
						if(this.weekdays[i].full == cdate.dayName){
							cdate.weekDayNo = i
					}
					//console.log(date , ':' ,cdate.month , cdate.day)
					return cdate
			},
			setClass : function(date){ // set css class for date buttons
				let btnClass = this.activeclass
				if(this.weekdays[date.weekDayNo].holliday === true)
					btnClass =  this.hollidayclass
				if(date.month.enDigit != this.dtpcurrent.month.enDigit)
					btnClass =  this.disableclass
				if(date.year.enDigit == this.dtpToday.year.enDigit && date.month.enDigit == this.dtpToday.month.enDigit && date.day.enDigit == this.dtpToday.day.enDigit)
					btnClass =  this.todayclass
				if(date.year.enDigit == this.dtpchoosen.year.enDigit && date.month.enDigit == this.dtpchoosen.month.enDigit && date.day.enDigit == this.dtpchoosen.day.enDigit)
					btnClass =  this.chooseclass
				
				return btnClass
			},
			createCalendarMatrix:function(){ // create a matrix for current month 
				if(!this.selectbtn || this.selectbtn == 'false')
					this.$refs['dtpfooter'].$refs['selectbtn'].classList.add('d-none')
				
				this.$refs['dtpfooter'].$refs['selectbtn'].value = 'save-date'
				
				let ccYear = this.dtpcurrent.year.enDigit
				let ccMonth = this.dtpcurrent.month.enDigit
				this.currentMonthMatrix = []
				
				for(let i =0 ;i<this.weekdays.length;i++){
					this.currentMonthMatrix[i] = [this.weekdays[i]]
				}
				//console.log(this.currentMonthMatrix)
				let cdate = {}
				let utcDate = []
				let yesterday = {}
				for(let i =1 ;i<42;i++){
					utcDate = ccYear+'-'+ccMonth+'-'+i
					if(i<10)
						utcDate = ccYear+'-'+ccMonth+'-0'+i
					//console.log(utcDate)
					utcDate = this.getDateObject(utcDate)
					// fill  days of week befor 1st of current month
					if(i ==1 && utcDate.weekDayNo != 0){
						let dObj = []
						for(let i = utcDate.weekDayNo-1;i>=0;i--){
							dObj = (this.objlocal !== false) ? this.objlocal.toUTC(utcDate.year.enDigit,utcDate.month.enDigit,utcDate.day.enDigit) : [utcDate.year.enDigit,utcDate.month.enDigit,utcDate.day.enDigit]
							dObj = dObj = moment(dObj[0]+'-'+dObj[1]+'-'+dObj[2])
							dObj = dObj.subtract((utcDate.weekDayNo-i), 'days').format('yyyy-MM-DD')
							dObj = (!this.objlocal) ?this.getDateObject(dObj,this.location,false):this.getDateObject(dObj,this.location,true)
							dObj.class = this.setClass(dObj)
							this.currentMonthMatrix[i].push(dObj)
						}
					}
					//console.log(utcDate)
					if(utcDate.month.enDigit == ccMonth){
						utcDate.class = this.setClass(utcDate)
						this.currentMonthMatrix[utcDate.weekDayNo].push(utcDate)
					}		
					// fill  days of week after 1st of current month
					if(utcDate.day.enDigit == 'Invalid Date' || utcDate.month.enDigit != ccMonth)
						{
							var date = yesterday.year.enDigit+'-'+yesterday.month.enDigit+'-'+yesterday.day.enDigit
							let newdate = ''
							if (!this.objlocal) {newdate = moment(date)}   
							else{
								newdate = this.objlocal.toUTC(yesterday.year.enDigit,yesterday.month.enDigit,yesterday.day.enDigit)
											.toString()
											.replaceAll(',','-')
								newdate = moment(newdate)
							}
							
							for(let i=yesterday.weekDayNo+1;i<7;i++){
								newdate = newdate.add(1,'days')
								date = newdate.format('yyyy-MM-DD')
								date = this.getDateObject(date,this.location,true)
								date.class = this.setClass(date)
								this.currentMonthMatrix[i].push(date)
							}
							break
						}
					yesterday = utcDate
				}
			},
			toEnglishDigits:function(str) { // convert Persian & Arabic numbers to English format
				// convert persian digits [۰۱۲۳۴۵۶۷۸۹]
				var e = '۰'.charCodeAt(0);
				str = str.replace(/[۰-۹]/g, function(t) {
					return t.charCodeAt(0) - e;
				});

				// convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
				e = '٠'.charCodeAt(0);
				str = str.replace(/[٠-٩]/g, function(t) {
					return t.charCodeAt(0) - e;
				});
				return str;
			},
			increase:function(type,steps = false){ // increase hour , minute , second , year
				// set value
				let val = 0
				if(type == 'hour') val = this.hour
				else if(type == 'min') val = this.minute
				else if(type == 'sec') val = this.second
				else val = this.dtpcurrent.year.enDigit
				// set max time
				let max = (type == 'hour') ? this.hMax : this.msMax
				if(type == 'year') max = 1000000
				// convert  value type to number
				if(typeof(val) == 'string')
					val = parseInt(val)
				// calculate time value
				if(steps !== false)
					return this.timeFormater(val+steps,max)
				val=this.timeFormater(val+1,max)
				// save and set values in input
				if(type == 'hour') this.hour = val
				else if(type == 'min')  this.minute = val
				else if(type == 'sec') this.second = val
				else this.dtpcurrent.year.enDigit = val
			},
			decrease:function(type,steps = false){ // decrease hour , minute , second , year
				// set value
				let val = 0
				if(type == 'hour') val = this.hour
				else if(type == 'min') val = this.minute
				else if(type == 'sec') val = this.second
				else val = this.dtpcurrent.year.enDigit
				// set max time
				let max = (type == 'hour') ? this.hMax : this.msMax
				if(type == 'year') max = 1000000
				// convert  value type to number
				if(typeof(val) == 'string')
					val = parseInt(val)
				// calculate time value
				if(steps !== false)
					return this.timeFormater(val-steps,max)
				val=this.timeFormater(val-1,max)
				
				// save and set values in input
				if(type == 'hour') this.hour = val
				else if(type == 'min')  this.minute = val
				else if(type == 'sec') this.second = val
				else this.dtpcurrent.year.enDigit = val
			},
			timeFormater:function(val,max){ // if time less than 10 set 0 before that
				if(typeof(val) == 'string')
					val = parseInt(val)
				if(val < 0 || Number.isNaN(val)) return max
				if(val >max ) return '00'
				if(val < 10 ) return '0'+val
				return val
			},
			wheelIt: function(event , type,step=false){ // when user wheel mouse , run this function to change year , hour , ...
				if(event.deltaY < 0) {return this.increase(type,step)} else {return this.decrease(type,step)}					
			},
			changeTime:function(event , type){ // change time function
				if(type == 'hour'){
					this.hour = this.timeFormater(parseInt(event.target.value),this.hMax)
					event.target.value = this.hour
				}
				if(type == 'min'){
					this.minute = this.timeFormater(parseInt(event.target.value),this.msMax)
					event.target.value = this.hour
				}
				if(type == 'sec'){
					this.second = this.timeFormater(parseInt(event.target.value),this.msMax)
					event.target.value = this.hour
				}
					
			},
		},
		components: {'dtp-header':dtpHeader,'dtp-content':dtpContent,'dtp-footer':dtpFooter},
		template: '<div class="modal fade " style="filter:opacity(98%)" :id="modalEl" :ref="modalEl" tabindex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog" ><div ref="modal-dialog" class="modal-dialog modal-dialog-centered " role="document"><div class="modal-content shadow-lg"  :dir="direction">'+
		
		'<dtp-header :second="second" :minute="minute" :hour="hour" :dtpcurrent="dtpcurrent" :clockseen="clockseen" :monthseen="monthseen" :calendarseen="calendarseen" :closebtn="closebtn" @close="closeModal" @monthpicker="displayMonthPicker" @yearpicker="displayYearPicker" @chmonth="wheelMonth" />'+
		
		'<dtp-content ref="dtpcontent" :months="months" :dtpcurrent="dtpcurrent" :calendarseen="calendarseen" :yearseen="yearseen" :monthseen="monthseen" :clockseen="clockseen" @chmonth="changeMonth" @decrease="decrease" @increase="increase" @wheelit="wheelIt" @changetime="changeTime" @wheelMonth="wheelMonth" @chooseDate="chooseDate" :second="second" :minute="minute" :hour="hour" />'+
		
		'<dtp-footer ref="dtpfooter" @showclock="hideElement" @showcal="displayCalendar" @showtoday="displaytoday" @dtpselect="dtpSelected" :clockbtn="clockbtn" :calendarbtn="calendarbtn" :todaybtn="todaybtn" :selectbtn="selectbtn" />'+
		'</div></div></div>'
	}
export const dtpComponent = {'dtpicker':formapp}