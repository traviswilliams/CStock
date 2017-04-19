var connection = require('../MySQL');

var game = {};
game.GetAllGames = function(callback,failure){
	connection.query('SELECT GameId, GameName, GamePassword, CreatedBy, CreateDate,StartDate,EndDate FROM Game',function(error, results fields){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
} 
game.GetMembersForGame = function(gameid, callback, failure){
	connection.query('SELECT UserId, JoinDate FROM GameMember WHERE gameid = ?', gameid, function(error,results,fields){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
}

game.GetGamesForUser = function(userid, callback, failure){
	connection.query('SELECT gameid, JoinDate FROM GameMember WHERE userid = ?', userid, function(error,results,fields){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		callback(results);
	});
}
game.AddUser = function(userid, gameid, joindate, callback,failure){
	connection.query('INSERT INTO GameMember (userid, gameid, JoinDate) VALUES (?,?,?)', [userid,gameid, joindate],function(error){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		if(callback)
			callback();
	});
}
game.DeleteUser = function(userid, gameid,callback,failure){
	connection.query('DELETE FROM GameMember WHERE Userid = ? AND GameId = ?',[userid,gameid], function(error){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		if(callback)
			callback();
	});
}
game.GetGame = function(gameid, callback, failure){
	connection.query('SELECT GameId, GameName, GamePassword, CreatedBy, CreateDate,StartDate,EndDate FROM Game WHERE gameid = ?', gameid, function(error,results,fields){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		if(callback)
			callback(results);
	});
}

game.CreateGame = function(GameName, GamePassword, CreatedBy, CreateDate,StartDate,EndDate, callback, failure){
	connection.query('INSERT INTO Game (GameName, GamePassword, CreatedBy,StartDate,EndDate) VALUES (?,?,?,?,?)', [GameName, GamePassword, CreatedBy, StartDate, EndDate],function(error){
		if(error){
			if(failure)
				failure();
			throw error;
		}
		if(callback)
			callback();
	});
}

module.exports = game;