"use strict";
// manages cache for asynchronous compile functions
var fs = require('fs');
var sourceMaps = require('./sourceMaps');
var util = require('./util');

var dirMode = parseInt('777', 8);

function mkdirs(_, path) {
	var p = "",
		i = 0;
	var segs = path.split('/').slice(0, -1);
	while (i < segs.length) {
		var seg = segs[i];
		p += (i++ ? '/' : '') + seg;
		if (!fs.exists(p, _, _)) {
			try {
				fs.mkdir(p, dirMode, _);
			} catch(err) {
				if (i > 1 && err.code !== 'EEXIST') {
					throw err;
				}
			}
		}
	}
}

function mtime(_, fname) {
	return fs.exists(fname, _, _) ? fs.stat(fname, _).mtime : 0;
}

exports.get = function(_, path, options, transform) {
	var result;
	if (!options.cache) {
		result = transform(_);
		if (result.map) sourceMaps.put(path, null, result.map);
		return result;
	}
	path = path.replace(/\\/g, '/');

	var i = path.indexOf('node_modules/');
	if (i < 0) i = path.lastIndexOf('/');
	else i += 'node_modules'.length;

	var dir = util.cacheDir(options);
	dir += '/' + path.substring(0, i).replace(/[\/\:]/g, '__');
	var f = dir + path.substring(i);
	mkdirs(_, f);
	var mapPath = f.replace(/(\.\w+)?$/, '.map');
	if (!options.force && mtime(_, f) > mtime(_, path)) {
		if (!(options.ignore && options.ignore(path))) sourceMaps.put(path, mapPath);
		return {
			code: fs.readFile(f, "utf8", _),
			map: options.sourceMaps ? sourceMaps.get(path) : null,
		};
	}
	result = transform(_);
	fs.writeFile(f, result.code, "utf8", _);
	if (result.map) {
		// write map to cache instead of keeping it in memory (maps are only needed for stack traces)
		sourceMaps.put(path, mapPath);
		if (result.map) fs.writeFile(mapPath, JSON.stringify(result.map, null, '\t'), "utf8", _);
	}
	return result;
}
