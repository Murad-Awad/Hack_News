   // This is called with the results from from FB.getLoginStatus().
   var searchID;
  var iterations;
  var likeIDs = [];
  var likes = [];
  var cons2 = [];

  var lib2 = [];
  var gre2 = [];
  var dem2 = [];
  var cons_final = 0;
  var lib_final = 0;
  var gre_final = 0;
  var dem_final = 0;
  var politicalParty;
  function accessPoliticalViews(){


      if (politicalParty=="Democratic"){
        window.searchID = '008930877100840778036:g8ybqy8di44';
      }
      if (politicalParty =="Republican"){
        window.searchID = '008930877100840778036:t3_vp29jiac';
      }
      if (politicalParty =="Green"){
        window.searchID = '008930877100840778036:efcprdxiic4';
      }
      if (politicalParty=="Libertarian"){
        window.searchID = '008930877100840778036:3xzm6nr_2p0';
      }
      else{
        window.searchID = '008930877100840778036:g8ybqy8di44';
      }
      console.log(searchID);
      loadSearch(searchID);
      if (window.location.href!='http://localhost:8888/index2.html' && window.searchID != null){

        window.location="index2.html";
      }
    };
  var logout = function(){
    FB.logout(function(response){
      window.location = "index.html";
  });
  window.location.href = "http://localhost:8888/index.html"}
    function loadSearch(swag) {
      var cx = swag;
      var gcse = document.createElement('script');
      gcse.type = 'text/javascript';
      gcse.async = true;
      gcse.src = 'https://cse.google.com/cse.js?cx=' + swag;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(gcse, s)
      console.log("it works");
    };
    var politicalViews;
    function statusChangeCallback(response) {

      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
        for ( i=0; i<politics.length; i++) {
          for ( j=0; j<politics.length; j++) {
            if (politics[j]>politics[j+1]) {
              var temp = politics[j];
              politics[j] = politics[j+1];
              politics[j+1] = temp;
            }
          }
        }

        FB.api(
        '/me',
        'GET',
        {"fields":"likes"},
        function(response) {

            function process(index, newValue) {
              likeIDs[index] = newValue;
            }

            for (i = 0; i<response.likes.data.length; i++ ){
              process(i, response.likes.data[i].id);
            }

            console.log('1', likeIDs);



            var count_up = 0;
            var sucess = 0;
            var a = 0;
            for (i = 0; i<likeIDs.length; i++){

              var a = binarySearch(politics, likeIDs[i]);

              if (a<0){


                continue;

              }
              sucess++;
              var ID = likeIDs[i];
              console.log(i);
              var cons = 0;
              var lib = 0;
              var gre = 0;
              var dem = 0;

              var count = 0;
              FB.api('/'+ID+'/posts', 'GET', {"limit" : "23"}, function(response){


                for (j=0; j<response.data.length; j++) {

                  console.log(response.data[j].message);
                  $.post(
                    'https://apiv2.indico.io/political',
                    JSON.stringify({
                      'api_key': "986f06a0ec1e7e7906e39e169da423c4",
                      'data': response.data[j].message,
                    })
                  ).then(function(res) {

                    var data = JSON.parse(res);
                    cons += data.results.Conservative;

                    lib+=data.results.Libertarian;
                    gre +=data.results.Green;
                    dem +=data.results.Liberal;
                    count++;

                    if(count==20) {
                      a++;

                      cons_final = cons_final + cons/(20*sucess);
                      lib_final = lib_final+lib/(20*sucess);
                      gre_final = gre_final+gre/(20*sucess);
                      dem_final = dem_final+dem/(20*sucess);
                      console.log(dem_final);
                      console.log(a+" "+sucess);
                      if (a==sucess-1) {
                        setPoliticalViews();
                      }






                      cons = 0;
                      lib = 0;
                      gre = 0;
                      dem = 0;
                      count = 0;




                    }








                  })
                   };


                }





              );

            }
function setPoliticalViews(){
  console.log(gre_final);
  if (cons_final>lib_final&&cons_final>gre_final&&cons_final>dem_final){
    politicalParty = "Conservative";
  }
  if (lib_final>cons_final&&lib_final>gre_final&&lib_final>dem_final){
    politicalParty = "Libertarian";
  }
  if (dem_final>lib_final&&dem_final>gre_final&&dem_final>cons_final){
    politicalParty = "Democratic";
  }
  if (gre_final>dem_final&&gre_final>lib_final&&gre_final>cons_final){
    politicalParty = "Green";
  }
    accessPoliticalViews();
};

        });

         }else{}
        // The person is not logged into your app or we are unable to tell.
      }
    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        if (response == null){
            window.location="index.html";
        }
        else{
        statusChangeCallback(response);
        var accessToken = response.authResponse.accessToken;
      }
      });
    }


    window.fbAsyncInit = function() {
    FB.init({
      appId      : '424022444629736',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function getLikes(array){
      FB.api(
      '/me',
      'GET',
      {"fields":"likes"},
      function(response) {
        var temp = JSON.stringify(response);

          for (i = 0; i<response.likes.data.length; i++ ){
            array.push(response.likes.data[i].id);
          }
          return array;
      }
    );
    }
    function testAPI() {
      console.log('Welcome!  Fetching your information.... ');
      FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
      });
      accessPoliticalViews();
            };
  function binarySearch(items, value){

      var startIndex  = 0,
          stopIndex   = items.length - 1,
          middle      = Math.floor((stopIndex + startIndex)/2);

      while(items[middle] != value && startIndex < stopIndex){

          //adjust search area
          if (value < items[middle]){
              stopIndex = middle - 1;
          } else if (value > items[middle]){
              startIndex = middle + 1;
          }

          //recalculate middle
          middle = Math.floor((stopIndex + startIndex)/2);
      }

      //make sure it's the right value

      return (items[middle] != value) ? -1 : middle;
  }

  var politics = ["9258148868",
  				"21516776437",
  				"7976226799",
  				"10513336322",
  				"132427453584273",
  				"10643211755",
  				"5281959998",
  				"19013582168",
  				"18468761129",
  				"56845382910",
  				"6250307292",
  				"374111579728",
  				"6013004059",
  				"62317591679",
  				"273864989376427",
  				"5550296508",
  				"219367258105115",
  				"155869377766434",
  				"197311240419563",
  				"545775132233909",
  				"1765033567057615",
  				"479042895558058",
  				"445821135487302",
  				"908009612563863",
  				"223649167822693",
  				"10606591490",
  				"5863113009",
  				"18343191100",
  				"167115176655082",
  				"174742062548592",
  				"131459315949",
  				"19440638720",
  				"20446254070",
  				"266790296879",
  				"1481073582140028",
  				"86680728811",
  				"13652355666",
  				"21898300328",
  				"354263831266028",
  				"29259828486",
  				"338028696036",
  				"8304333127",
  				"15704546335",
  				"102533606954",
  				"95475020353",
  				"80256732576",
  				"136264019722601",
  				"140738092630206",
  				"69813760388",
  				"36400348187",
  				"85452072376",
  				"182919686769",
  				"912274352202712",
  				"35994014410",
  				"408250066356",
  				"123624513983",
  				"519305544814653",
  				"112623813202",
  				"193266897438",
  				"169204449790211",
  				"158924294183807",
  				// fake news
  				"146422995398181",
  				"177486166274",
  				"762592150466931",
  				"253546571389025",
  				"180213475460766",
  				"20950654496",
  				"38423635680",
  				"114517875225866",
  				"11539801009",
  				"286075841466822",
  				"1672814509645693",
  				"186219261412563",
  				"1640832309490921",
  				"346937065399354",
  				"298227226929908",
  				"1439042583002670",
  				"131929868907",
  				"606565022725513",
  				"463855417049923",
  				"320840064659503",
  				"211482380627",
  				"35590531315",
  				"114896831960040",
  				"311190048935167",
  				"820759888034335",
  				"1425604894326440",
  				"179035672287016",
  				"236763656409160",
  				"687156898054966",
  				"1578074585774580",
  				"80256732576",
  				"116727628853",
  				"508887815910815",
  				"106547192707583",
  				"95475020353",
  				"140738092630206",
  				"319569361390023",
  				"245481491808",
  				// politicians
  				"6815841748",
  				"22092775577",
  				"7860876103",
  				"124955570892789",
  				"360249323990357",
  				"86574174383",
  				"889307941125736",
  				"7656215652",
  				"482778861771212",
  				"180213475460766",
  				"207116912648950",
  				"259130650776119",
  				"123994667639233",
  				"355316521236121",
  				"63002536261",
  				"155244824599302",
  				"153080620724",
  				"133961323610549",
  				"6726182861",
  				"316611475124277",
  				"77590795932",
  				"69983322463",
  				"58736997707",
  				"138691142964027",
  				"210257445769973",
  				"180381489134",
  				"493471480388",
  				"261624820205",
  				"44746457369",
  				"54172246106",
  				"6934857868",
  				"134193140910"];
