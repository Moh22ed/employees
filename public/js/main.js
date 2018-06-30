$(document).ready(function(){
 $('.deleteEmployee').on('click', deleteEmployee);
});

function deleteEmployee(){
    var confirmation = confirm('Are You Sure?');


    if(confirmation){
    	$.ajax({
    		type:'DELETE',
    		 url:'/employees/delete/' + $(this).data('id')
    	}).done(function(response){
        
      window.location.replace('/');
 
            
    	});
      window.location.replace('/');

    }else{
    	return false;
    }
}