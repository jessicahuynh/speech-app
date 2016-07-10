Template.speechreco.onRendered(function () {
	loadWebkitLangs();

	if (!('webkitSpeechRecognition' in window)) {
		$('#webkit-reco').html('<p>Webkit speech recognition only works in a Webkit browser.</p>');
	}
});

Template.speechreco.helpers({
});

Template.speechreco.events({
	'change #webkit-lang'(event,instance) {
		setTopolects($('#webkit-lang').val());
	},
	'submit #webkit-reco'(event,instance) {
		event.preventDefault();

		var recognition = new webkitSpeechRecognition();
		recognition.continuous = $('#webkit-continuous').val();
		recognition.interimResults = $('#webkit-interim').val();
		recognition.lang = $('#webkit-topolect').val();

		console.log(recognition);
	},
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

// stole these from the Chrome demo page
var langs =
	[['Afrikaans',       ['af-ZA']],
	['Bahasa Indonesia',['id-ID']],
	['Bahasa Melayu',   ['ms-MY']],
	['Català',          ['ca-ES']],
	['Čeština',         ['cs-CZ']],
	['Dansk',           ['da-DK']],
	['Deutsch',         ['de-DE']],
	['English',         ['en-AU', 'Australia'],
						['en-CA', 'Canada'],
						['en-IN', 'India'],
						['en-NZ', 'New Zealand'],
						['en-ZA', 'South Africa'],
						['en-GB', 'United Kingdom'],
						['en-US', 'United States']],
	['Español',         ['es-AR', 'Argentina'],
						['es-BO', 'Bolivia'],
						['es-CL', 'Chile'],
						['es-CO', 'Colombia'],
						['es-CR', 'Costa Rica'],
						['es-EC', 'Ecuador'],
						['es-SV', 'El Salvador'],
						['es-ES', 'España'],
						['es-US', 'Estados Unidos'],
						['es-GT', 'Guatemala'],
						['es-HN', 'Honduras'],
						['es-MX', 'México'],
						['es-NI', 'Nicaragua'],
						['es-PA', 'Panamá'],
						['es-PY', 'Paraguay'],
						['es-PE', 'Perú'],
						['es-PR', 'Puerto Rico'],
						['es-DO', 'República Dominicana'],
						['es-UY', 'Uruguay'],
						['es-VE', 'Venezuela']],
	['Euskara',         ['eu-ES']],
	['Filipino',        ['fil-PH']],
	['Français',        ['fr-FR']],
	['Galego',          ['gl-ES']],
	['Hrvatski',        ['hr_HR']],
	['IsiZulu',         ['zu-ZA']],
	['Íslenska',        ['is-IS']],
	['Italiano',        ['it-IT', 'Italia'],
						['it-CH', 'Svizzera']],
	['Lietuvių',        ['lt-LT']],
	['Magyar',          ['hu-HU']],
	['Nederlands',      ['nl-NL']],
	['Norsk bokmål',    ['nb-NO']],
	['Polski',          ['pl-PL']],
	['Português',       ['pt-BR', 'Brasil'],
						['pt-PT', 'Portugal']],
	['Română',          ['ro-RO']],
	['Slovenščina',     ['sl-SI']],
	['Slovenčina',      ['sk-SK']],
	['Suomi',           ['fi-FI']],
	['Svenska',         ['sv-SE']],
	['Tiếng Việt',      ['vi-VN']],
	['Türkçe',          ['tr-TR']],
	['Ελληνικά',        ['el-GR']],
	['български',       ['bg-BG']],
	['Pусский',         ['ru-RU']],
	['Српски',          ['sr-RS']],
	['Українська',      ['uk-UA']],
	['한국어',            ['ko-KR']],
	['中文',             ['cmn-Hans-CN', '普通话 (中国大陆)'],
						['cmn-Hans-HK', '普通话 (香港)'],
						['cmn-Hant-TW', '中文 (台灣)'],
						['yue-Hant-HK', '粵語 (香港)']],
	['日本語',           ['ja-JP']],
	['हिन्दी',            ['hi-IN']],
	['ภาษาไทย',         ['th-TH']]];

function loadWebkitLangs() {
	for (var i = 0; i < langs.length; i++) {
		var lang = langs[i][0];
	
		// every language option in the first dropdown
		$('#webkit-lang').append($('<option></option>').attr("value", i).text(lang));
	}

	$('select').material_select();
}

function setTopolects(lang) {
	var topolects = langs[lang];

	$('#webkit-topolect').empty();
	
	if (topolects.length > 2) {
		for (var j = 1; j < topolects.length; j++) {
			$('#webkit-topolect').append($('<option></option>').attr("value", topolects[j][0]).text(topolects[j][1] + ' ('+topolects[j][0]+')'));
		}
	} else {
		// if there's only one available topolect/dialect, just set that one as the available option
		$('#webkit-topolect').empty().append($('<option></option>').attr("value", topolects[1]).text(langs[lang][0] + ' ('+topolects[1]+')'));
	}

	$('select').material_select();
}