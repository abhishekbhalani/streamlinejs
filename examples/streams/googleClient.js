/*** Generated by streamline 0.1.31 - DO NOT EDIT ***/

var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, fn){ var ctx = __global.__context; return function(err, result){ __global.__context = ctx; if (err) return _(err); try { return fn(null, result); } catch (ex) { return __propagate(_, ex); } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function(e, r){ cb(e, r); }; fn.apply(this, args); return function(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function __main(_) {
              var streams, str, result, formatted;
/*    10 */   function google(str, _) {
                if (!_) {
                  return __future(google, arguments, 1);
                }
              ;
                var req, resp;
/*    16 */     req = streams.httpRequest({
/*    17 */       url: ("http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + str),
/*    18 */       proxy: process.env.http_proxy
                });
/*    25 */     return req.end().response(__cb(_, function(__0, __1) {
                  resp = __1;
/*    27 */       return resp.checkStatus(200).readAll(__cb(_, function(__0, __3) {
/*    27 */         var __2 = JSON.parse(__3);
                    return _(null, __2);
                  }));
                }));
              };
/*     8 */   streams = require("../lib/server/streams");
/*    31 */   str = ((process.argv.length > 2) ? process.argv[2] : "node.js");
/*    34 */   return google(str, __cb(_, function(__0, __1) {
                result = __1;
/*    39 */     formatted = result.responseData.results.map(function(entry) {
/*    38 */       return ((entry.url + "\n	") + entry.titleNoFormatting);
/*    39 */     }).join("\n");
/*    40 */     console.log(formatted);
                _();
              }));
            }).call(this, __trap);
