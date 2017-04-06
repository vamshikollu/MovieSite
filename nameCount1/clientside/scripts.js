function readbox()
{
	//console.log("hai from scripts");
//var a=document.getElementById("uword").value;
//console.log("Entered value is:"+a);

}


$(function($http,$scope){
	$("#btn1").on('click',function(){
	 //$("#wordinfo").slideToggle(1900);
	 var a=document.getElementById("name").value;
	// console.log("Entered value is:"+a);
	 
	//creating the data object
	 var $wordinfo=$('#wordinfo');
	 var $tab=$('#tab');
	 
	 var data={
 			name: a,
 			count: 1
 	   	};
	 
	 //code for sending data to info
	 console.log("Ajax input is"+JSON.stringify(data));
	 $.ajax({
		 type: 'POST',
		 url:'/info',
		 data: JSON.stringify(data),
		 success: function(rdata){
			// console.log("response data is "+ JSON.stringify(rdata));
			 //$wordinfo.empty();
			   $tab.empty();
			 for(k in rdata)
				 {
			// $wordinfo.append("<li>name:"+k+",count:"+rdata[k]+"</li>");
			 $tab.append("<tr><td>"+k+"</td><td>"+rdata[k]+"</td></tr>");
		//	 console.log("data posted to info success:"+JSON.stringify(rdata).name);
				 }
		 },
		 error:function(){
			 alert("error sendind data to info");
		 }
	 })
	 
	  
	 
	//get the data from info
	/* $.ajax({
		 type: "GET",
		 url: "/info",
		 success:function(orders){
			 $.each(orders,function(i,order){
			//	 console.log("we have recived server data in client");
				 $wordinfo.append("<li>name:"+order.name+",count:"+order.count+"</li>");
			 })
			
		 },
		 error:function(){
			 alert("error loading data from info");
		 }
	 })
	 */
	});
});


