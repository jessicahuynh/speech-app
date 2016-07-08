Template.synthesis.onRendered(function() {
	if (window.speechSynthesis) {
		voices = window.speechSynthesis.getVoices();

		voices.forEach(function(voice, index) {
			var $option = $('<option>')
			.val(index)
			.html(voice.name + (voice.default ? ' (browser default)' :''));
			
			$('#html5-voicelist').append($option);
		});
		
		// voices load asynchronously, so a quick and dirty hack is to set a small timer
		// don't actually do this in your app
		window.setTimeout(function() {
			$('select').material_select();
		},1000);
	}
	else {
		$('#html5-tts').html('<p>Your browser doesn\'t support HTML5 speech synthesis!</p>');
	}

	
});


Template.synthesis.events({
	'submit #html5-tts'(event,instance) {
		event.preventDefault();

		var msg = new SpeechSynthesisUtterance();

		msg.text = $('#html5-tts-field').val();
		msg.rate = $('#html5-rate').val();
		msg.pitch = $('#html5-pitch').val();
		msg.voice = voices[$('#html5-voicelist').val()];
		console.log(msg);

		msg.onend = function(e) {
			console.log('Finished in ' + event.elapsedTime + ' seconds.');
		};

		speechSynthesis.speak(msg);
	},
	'keyup #mashup-text-field'(event,instance) {
		$('.mashup-ssml-basic').html('&lt;speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"&gt;'+$('#mashup-text-field').val()+'&lt;/speak&gt;');
	},
	'submit #mashup-tts'(event,instance) {
		event.preventDefault();

		Meteor.call('mashupTTS', true, 'Pizza',$('.mashup-ssml-basic').html());
	}
});

