var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

	var fs = require("fs");
	var paths = require("path");
	var async = require("async");
	var dir = config.myDir;
	console.log("myDir",dir);

	fs.readdir(dir, function(err, list) {

		console.log(list);

		var arr = [];
		function mapFn(val,callback){
			fs.readdir(dir+val, function(err, path) {
				var sArr = [];
				var mvArr = [];
				function mapFn2(sub,callback2){

					var extIndex = sub.lastIndexOf('.');
					if (extIndex != -1)
					{
					   var name = sub.substr(0, extIndex);
					   var ext= sub.substr(extIndex+1, sub.length);
					   if(ext == 'jpg' || ext == 'JPG'){
							sArr.push(val+'/'+sub);
					   }else
					   if(ext == 'avi' || ext == 'mpeg' || ext == 'mp4' || ext == 'mkv' || ext == 'wmv'){
						   mvArr.push(val+'/'+sub);
					   }
					}
					callback2(null,'');
				}
				async.map(path, mapFn2, function(err, result){
					var oobj = {
						name:val,
						img:sArr,
						mv:mvArr
					}
					console.log("rr",oobj);
					arr.push(oobj);
					callback(null,'');
				});

			})
		};
		async.map(list, mapFn, function(err, result){
			// res.json(arr);
			res.render("av",{datas:arr,title:'AV',myDir:dir});
		});

	});

});

module.exports = router;
