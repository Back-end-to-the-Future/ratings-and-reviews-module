module.exports = {
  getRandomIds1: (context, events, done) => {
    context.vars.product_id = Math.floor(Math.random() * 3333333) + 1;
    return done();
  },
  getRandomIds2: (context, events, done) => {
    context.vars.product_id = Math.floor(Math.random() * 3333333) + 6666666;
    return done();
  },
  getRandomIds3: (context, events, done) => {
    context.vars.product_id = Math.floor(Math.random() * 6666666) + 9999999;
    return done();
  },
  getRandomIds4: (context, events, done) => {
    context.vars.product_id = Math.floor(Math.random() * 1111111) * 1;
    return done();
  },
};
