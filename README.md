# Brilliant-Lunch

Javascript plugin 'full calendar' is used to render the event calendar.
The events are passed to a global function called matchLunchEvents in 9:00 Am + minutes format.
The matchLunchEvents takes in an array of events as the input parameter and loops through each element to construct an object that is required by the full calendar to render an event.

Ex:  let obj = {
        title  : index == 0 ? 'Me' : 'Brilliant Lunch',
        start  : startDate,
        end: endDate,
        allDay: false,
    }
    
 Two inbuilt methods have been used : eventRender and eventAfterRender .
eventRender gets called before the event is rendered. I have used this method to add the styling to the other events based on  the overlap time.
eventAfterRender gets called after the event is rendered. I have used this method to style the 'Me' event based on the overlap duration.



 
