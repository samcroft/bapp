var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }
};

$(function(){
	
	function loadBugs() {
		var bugs = $('#bugs ul').empty();
		
		$.ajax({
			type: 'GET',
			url: 'http://localhost/bapp/bugs.php?&jsoncallback=?',
			dataType: 'JSONp',
			timeout: 5000,
			success: function(data) {
				$.each(data, function(i,item){
					bugs.append('<li>'+item.title)
				});
			},
			error: function(data) {
				bugs.append('<li>There was an error loading the bugs');
			}
		});
	}
	
	$('#add-bug form').submit(function(){
		var loading = $(this).find('input[type="submit"]');
		loading.addClass('loading');
		
		var postData = $(this).serialize();

		$.ajax({
			type: 'POST',
			data: postData,
			url: 'http://localhost/bapp/add-bug.php',
			success: function(data){
				loadBugs();

				$('#bugs').addClass('current');
				$('#add-bug').removeClass('current');

				loading.removeClass('loading');
				console.log('Bug added!');
			},
			error: function(){
				loading.removeClass('loading');
				console.log('There was an error');
			}
		});

		return false;
	});
	
	loadBugs();
	
});