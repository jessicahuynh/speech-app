Template.synthesis.onRendered(function() {
	if (window.speechSynthesis) {
		this.autorun(function() {
			voices = window.speechSynthesis.getVoices();

			voices.forEach(function(voice, index) {
				var $option = $('<option>')
				.val(index)
				.html(voice.name + (voice.default ? ' (browser default)' :''));
				
				$('#html5-voicelist').append($option);
			});
		});
		
		
		console.log($('#html5-voiceless').html());

		$('select').material_select();
		
	}

	
});


Template.synthesis.events({
	'click #html5-tts-submit'(event,instance) {
		event.preventDefault();
		$('select').material_select();

		var speechInput = $('#html5-tts-field').val();
		var msg = new SpeechSynthesisUtterance();
		var voices = window.speechSynthesis.getVoices();
	}
});

