import { HTTP } from 'meteor/http';

Meteor.methods({

	mashupTTS:function(containsSSML,appname,txt) {
		
		return HTTP.call(
			"POST",
			"https://service.interactions.net/smm/tts",
			{
				npmRequestOptions: {
					rejectUnauthorized: false
				},
				headers: {
					"Content-Type": "text/plain"
				},
				content: txt.split('&lt;').join('<').split("&gt;").join('>'),
				params: {
					uuid:Meteor.settings.mashup.uuid,
					ssml:containsSSML,
					appname:appname,
					audioFormat:"amr"
				}
			}
		);
	},

	convertAmrToMp3:function(amr) {
		return HTTP.call(
			"POST",
			"https://api.cloudconvert.com/convert",
			{
				params: {
					apikey:Meteor.settings.cloudconvert.key,
					inputformat:"amr",
					outputformat:"mp3",
					input:"raw",
					file:amr.replace(/%([^\d].)/, "%25$1"),
					filename:"mashup.amr",
					timeout:1000,
					wait:true,
					download:"true"
				}
			}
		);
	}
});