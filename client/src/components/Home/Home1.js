import $ from 'jquery'
var main=(function() { 
    // Function to change the nav-bar on scroll

    // $(window).scroll(function(){
    //     ($(window).scrollTop() >= 100) ? (
    //         $('.fixed-nav-bar').addClass('scrolled'),
    //         $('.the-bass').addClass('scrolled')
    //     ) : (
    //         $('.fixed-nav-bar').removeClass('scrolled'),
    //         $('.the-bass').removeClass('scrolled')
    //     );
    // });
    
    // Drop Down Function
    $('#menuButton').on('change', function(){
        // console.log("heyy")
        ($('#menuButton').is(':checked')) ? (
            $('.the-bass').addClass('dropped')
        ) : (
            $('.the-bass').removeClass('dropped')
        );
    });
});

  
document.addEventListener('DOMContentLoaded', (event) => {
    console.log("heyyyy")
    //the event occurred
    main()
  })