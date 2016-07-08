import { HTTP } from 'meteor/http';

Meteor.methods({

	mashupTTS:function(containsSSML,appname,txt) {
		
		HTTP.call(
			"POST",
			"https://service.interactions.net/smm/tts",
			{
				npmRequestOptions: {
					rejectUnauthorized: false // TODO remove when deploy
				},
				headers: {
					"Content-Type": "text/plain; charset=UTF-8"
				},
				content: txt.split('&lt;').join('<').split("&gt;").join('>'),
				params: {
					uuid:Meteor.settings.mashup.uuid,
					ssml:containsSSML,
					appname:appname,
				}
			},
			function(error,result) {
				if (!error) {
					return result;
				}
				else {
					console.log('An error occurred.');
					console.log(error);
				}
			})
	}
});