
let scheduledEvents = []; // Array list passed as param to matchLunchEvent function
let eventList = []; // List of events which has the required overlap duration
let mySchedule; // 'Me' element for the purpose of customisation

matchLunchEvent([{start: 225, end: 285},{start: 210, end: 270},{start: 180, end: 240},{start: 240, end: 300},{start: 300, end: 360},{start: 270, end: 330}]);

/**
 * @method matchLunchEvent
 * @description Takes in a set of events and renders the event calendar
 * @param { events }
 * @returns none
 */
function matchLunchEvent(events){
   eventList = [];
   let startDate,endDate;
   scheduledEvents = [];
   events.map((current,index) => {
    startDate = moment('9:00:00 AM', 'h:mm:ss A')
    .add(current.start, 'minutes');
    endDate = moment('9:00:00 AM', 'h:mm:ss A')
    .add(current.end, 'minutes');
    let obj = {
        title  : index == 0 ? 'Me' : 'Brilliant Lunch',
        start  : startDate,
        end: endDate,
        allDay: false,
    }
    scheduledEvents.push(obj);
   });
  $('#calendar').fullCalendar('removeEvents');
  $('#calendar').fullCalendar('addEventSource', scheduledEvents);
  $('#calendar').fullCalendar('rerenderEvents');
}


$(function() {
    $('#calendar').fullCalendar({
          events: scheduledEvents,
          defaultView: 'agendaDay',
          minTime: "09:00:00",
          maxTime: "22:00:00",
          allDaySlot: false,
          contentHeight: 720,
          slotEventOverlap: false,
          selectOverlap: true,
          /**
           * @method eventRender
           * @description Excuted just before the event id rendered.
           * @param current event, element being rendered
           * @returns none
           */
          eventRender: function(event, element) {
            if (scheduledEvents[0].start.isBetween(event.start,event.end)|| scheduledEvents[0].end.isBetween(event.start,event.end)){
                if (event.end.diff(scheduledEvents[0].start, 'm') >= 30 &&  event.end.diff(scheduledEvents[0].start, 'm') < 60){
                    element[0].classList.add('matched');
                }else if (scheduledEvents[0].end.diff(event.start, 'm') >= 30 && scheduledEvents[0].end.diff(event.start, 'm') < 60){
                    element[0].classList.add('matched');
                }
            }
            $('#calendar').fullCalendar('updateEvent', scheduledEvents[0]);
          },
          /**
           * @method eventAfterRender
           * @description Executes after the event has been rendered
           * @params current event, current element, current view
           */
          eventAfterRender: function( event, element, view ) {
              document.querySelectorAll('.fc-title').length > 0  && 
              Array.prototype.map.call(document.querySelectorAll('.fc-title'), (elem) => {
                if(elem.innerText === "Me"){
                    mySchedule =  elem.parentNode.parentNode;
                }
                  });
            if(scheduledEvents[0].start.isBetween(event.start,event.end) || scheduledEvents[0].end.isBetween(event.start,event.end)){
                if(event.end.diff(scheduledEvents[0].start, 'm') > 30 &&  event.end.diff(scheduledEvents[0].start, 'm') < 60){
                    eventList.push(event);
                }
                else if (scheduledEvents[0].end.diff(event.start, 'm') > 30 && scheduledEvents[0].end.diff(event.start, 'm') < 60){
                    eventList.push(event);
                }
             }
           if(eventList.length > 0 ){
            mySchedule.classList.remove('notmatched');
            mySchedule.classList.add('matched')
           }
           else{
            mySchedule.classList.add('notmatched');
            mySchedule.classList.remove('matched');
           }
           
        }
    });
    eventList = [];
    mySchedule = '';
    scheduledEvents = []
  
  });