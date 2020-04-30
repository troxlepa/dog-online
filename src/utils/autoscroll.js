// Modified from code by Heather Booker
// https://medium.com/@heatherbooker/how-to-auto-scroll-to-the-bottom-of-a-div-415e967e7a24

export default function autoscroll(element) ***REMOVED***
  function animateScroll(duration) ***REMOVED***
    var start = element.scrollTop;
    var end = element.scrollHeight;
    var change = end - start;
    var increment = 20;

    function easeInOut(currentTime, start, change, duration) ***REMOVED***
      // by Robert Penner
      currentTime /= duration / 2;
      if (currentTime < 1) ***REMOVED***
        return (change / 2) * currentTime * currentTime + start;
***REMOVED***
      currentTime -= 1;
      return (-change / 2) * (currentTime * (currentTime - 2) - 1) + start;
***REMOVED***

    function animate(elapsedTime) ***REMOVED***
      elapsedTime += increment;
      var position = easeInOut(elapsedTime, start, change, duration);
      element.scrollTop = position;
      if (elapsedTime < duration) ***REMOVED***
        setTimeout(function() ***REMOVED***
          animate(elapsedTime);
***REMOVED*** increment);
***REMOVED***
***REMOVED***

    animate(0);
***REMOVED***

  function scrollToBottom() ***REMOVED***
    var duration = 300;
    animateScroll(duration);
***REMOVED***

  var observer = new MutationObserver(scrollToBottom);
  var config = ***REMOVED*** childList: true ***REMOVED***;
  observer.observe(element, config);
  return () => ***REMOVED***
    observer.disconnect();
***REMOVED***;
***REMOVED***
