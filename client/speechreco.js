Template.speechreco.onRendered(function () {
	$('select').material_select();
});

Template.speechreco.helpers({
});

Template.speechreco.events({
	'submit #bing-reco'(event,instance) {
        event.preventDefault();

		$('#bing-reco-result').val('');

		Meteor.call('getBingKey',function(error,result) {
			if (error) {
				console.log(error);
			}
			else {
				var client = Microsoft.ProjectOxford.SpeechRecognition.SpeechRecognitionServiceFactory.createMicrophoneClient(
					$('#bing-reco-mode').val(),
					'en-US',
					result,
					result
				);

				client.startMicAndRecognition();
				setTimeout(function () { 
					client.endMicAndRecognition();
					console.log('end');
				}, 5000); 

				client.onPartialResponseReceived = function (response) { 
					displayBingRecoResult(response);
					console.log(response); 
				} 

				client.onFinalResponseReceived = function (response) { 
					displayBingRecoResult(response);
					console.log(response);
				} 
			}
		
		});

    }
});

function displayBingRecoResult(text) {
	document.getElementById('bing-reco-result').value += JSON.stringify(text);
}