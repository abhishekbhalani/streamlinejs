/*** Generated by streamline 0.1.31 - DO NOT EDIT ***/

var __global = typeof global !== 'undefined' ? global : window;
function __cb(_, fn){ var ctx = __global.__context; return function(err, result){ __global.__context = ctx; if (err) return _(err); try { return fn(null, result); } catch (ex) { return __propagate(_, ex); } } }
function __future(fn, args, i){ var done, err, result; var cb = function(e, r){ done = true; err = e, result = r; }; args = Array.prototype.slice.call(args); args[i] = function(e, r){ cb(e, r); }; fn.apply(this, args); return function(_){ if (done) _.call(this, err, result); else cb = _.bind(this); } .bind(this); }
function __nt(_, fn){ var i = 0; var cb = __cb(_, fn); var safeCb = function(){ try { cb(); } catch (ex) { __propagate(cb, ex); } }; if (typeof process != "undefined" && typeof process.nextTick == "function") return function(){ if (++i % 20 == 0) process.nextTick(safeCb); else cb(); }; else return function(){ if (++i % 20 == 0) setTimeout(safeCb); else cb(); }; }
function __propagate(_, err){ try { _(err); } catch (ex) { __trap(ex); } }
function __trap(err){ if (err) { if (__global.__context && __global.__context.errorHandler) __global.__context.errorHandler(err); else console.error("UNCAUGHT EXCEPTION: " + err.message + "\n" + err.stack); } }
            (function __main(_) {
              var fs, p, t0;
/*    13 */   function du(_, path) {
                if (!_) {
                  return __future(du, arguments, 0);
                }
              ;
                var total, stat, files, i;
/*    14 */     total = 0;
/*    15 */     return fs.stat(path, __cb(_, function(__0, __1) {
                  stat = __1;
                  return (function(__then) {
/*    16 */         if (stat.isFile()) {
/*    17 */           return fs.readFile(path, __cb(_, function(__0, __2) {
/*    17 */             total += __2.length;
                        __then();
                      }));
                    }
                     else {
                      return (function(__then) {
/*    19 */             if (stat.isDirectory()) {
/*    20 */               return fs.readdir(path, __cb(_, function(__0, __3) {
                            files = __3;
/*    21 */                 i = 0;
                            var __9 = false;
                            (function(__break) {
                              var __loop = __nt(_, function() {
                                if (__9) {
/*    21 */                       i++;
                                }
                                 else {
                                  __9 = true;
                                }
                              ;
/*    21 */                     var __8 = (i < files.length);
                                if (__8) {
/*    22 */                       return du(__cb(_, function(__0, __4) {
/*    22 */                         total += __4;
                                    __loop();
/*    22 */                       }), ((path + "/") + files[i]));
                                }
                                 else {
                                  __break();
                                }
                              ;
                              });
                              __loop();
                            })(function() {
/*    24 */                   console.log(((path + ": ") + total));
                              __then();
                            });
                          }));
                        }
                         else {
/*    27 */               console.log((path + ": odd file"));
                          __then();
                        }
                      ;
                      })(__then);
                    }
                  ;
                  })(function() {
/*    29 */         return _(null, total);
                  });
                }));
              };
/*    11 */   fs = require("fs");
/*    32 */   p = ((process.argv.length > 2) ? process.argv[2] : ".");
/*    34 */   t0 = Date.now();
/*    35 */   return du(__cb(_, function() {
/*    36 */     console.log((("completed in " + ((Date.now() - t0))) + " ms"));
                _();
/*    35 */   }), p);
            }).call(this, __trap);
