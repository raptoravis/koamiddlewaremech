function compose(middlewares) {
    return function(next) {
      var i = middlewares.length;
      var next = function*() {}();
      while (i--) {
        next = middlewares[i].call(this, next);
      }
      return next;
    }
  }

  var gen1=function*(next){
    console.log('begin!');
    yield next;
    console.log('end!');
  }

  var gen2=function*(next){
    console.log('begin 2');
    yield next;
    console.log('end 2');
  }

  var gen3=function*(next){
    console.log('this is another function!');
  }

  var bundle=compose([gen1,gen2,gen3]);
  var g=bundle();

  var another1=g.next();  //'begin!';
  var another2=another1.value.next(); //'begin 2';
  another2.value.next(); //'this is another function!';
  another1.value.next(); //'end 2';
  g.next(); //'end!';