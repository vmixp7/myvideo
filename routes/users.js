var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	const process = require('child_process');
	const name = req.query.name;
	process.exec('start "" "'+ config.myDir + name + '"',(error, stdout, stderr) => {
	  if (error) {
		console.error(`[exec error]: ${error}`);
		return;
	  }
	  console.log('open move ok!');
	  res.send('ok');
	});
});

module.exports = router;
