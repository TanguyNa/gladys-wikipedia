var util = require('util');
const Promise = require('bluebird');

module.exports = function search(keyword){
	
	var lang = 'en';
	
	gladys.user.get().then(function(user){
		if(user[0].language!='fr-FR')
			lang = 'fr';
	});
	
	
	var req = util.format(`https://%s.wikipedia.org/w/api.php?action=opensearch&search=%s`, lang, keyword);
    console.log(`Wikipedia - Sending ${req}`);
    
	return gladys.utils.request(req)
        .then((response) => {
			
			if((typeof response[2][0] != 'undefined') && response[2][0] != null)
			{
				let array = response[2][0].match(/((\S+ ){20}\S+)|(\S+( \S+)*)(?= *\n|$)|\S+/g);

				if((typeof array != 'undefined') && array != null)
				{
					for(let i= 0; i < array.length; i++)
					{
						 gladys.modules.speak.say({language: lang, text: array[i]});
					}
				}else
				{
					
					erreur();
					
				}

			}else
			{
				erreur();
			}
			return true;
        })
        .catch((err) => {
            console.log(`Wikipedia - Error: ${err}`);
            return false;
        });
	}
	
	function erreur(lang)
	{
		if(lang == 'fr')
			gladys.modules.speak.say({language: 'fr', text: 'Désolé je n\'ai rien trouvé'});
		else gladys.modules.speak.say({language: 'en', text: 'Sorry I didn\'t find anything'});
	}