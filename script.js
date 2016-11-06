$(document).ready(function(){
  
    $('#search').keypress(function(e) {
        if (e.which == 13) {
            getApiData()
        }
    });
    
    $("button").click(function(){
        getApiData();
    });
        
    function getApiData() {
        
        $("#loader").show();
        var title = $('#search').val(); //user input to search field 
        var url = "http://api.giphy.com/v1/gifs/search?q="+ title +"&api_key=dc6zaTOxFJmzC&limit=10&offset=0";
        $.getJSON(url, function(data){
        
            var article = "";
                //looping through json data...
            if(data['data'].length >  0){
                  for (var i = 0; i < data['data'].length; i++) {
                         var img = data['data'][i]['images']['fixed_height']['url'];
                         article +="<div id=result class='col l4 m6 s12' ><a class='responsive-im' href='" + img + 
                            "'target='_blank'><div class='result' style='background-image:url("+img+")'></div></a></div>";
                   }

              //results from API
                  $("#loader").hide();
                 $('#result').html(article);
             }
               else
                  {
                      //no data from api request...
                      article = "<div class='result error'><h2> Sorry, But We could not find anything for you at the moment. maybe you should try another search query!.</p></div>";
                      $("#loader").hide();
                      $('#result').html(article);
                  }
       
        });
        
           $('.block').animate({"margin-top":"0em"}, "fast");
            $("#result").show(1000);
      }
     
    $( "#search" ).focus(function() {
             $("#result").hide('slow');
          });
});